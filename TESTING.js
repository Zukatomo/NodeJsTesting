const { assert } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { address } = require('faker')
const should = chai.should()
const server = 'http://localhost:3000'

const faker = require('faker')

const newEvent= ()=>{
    return {
        name:faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        startTime: (new Date(faker.date.future())).getTime(),
        address:{
            country:faker.address.country(),
            county:faker.address.county(),
            city:faker.address.city(),
            streetAddress: faker.address.streetAddress(),
        },
        organizedBy: {
            companyName: faker.company.companyName(),
            domain: faker.internet.domainName(),
            email: faker.internet.email(),
            contactPerson: {
                firstName: faker.name.findName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber(),
            }
        }
    }
}

chai.use(chaiHttp)

describe('Events withouth auth', () => {
    describe('/GET events', () => {
        it('it should GET all the books with correct types', (done) => {
            chai.request(server)
                .get('/events')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.have.lengthOf(1000)
                    res.body[0].should.have.property('id').be.a('number')
                    res.body[0].should.have.property('name').be.a('string')
                    res.body[0].should.have.property('description').be.a('string')
                    res.body[0].should.have.property('startTime').be.a('number')
                    res.body[0].should.have.property('address').be.a('object')
                    res.body[0]['address'].should.have.property('country').be.a('string')
                    res.body[0]['address'].should.have.property('county').be.a('string')
                    res.body[0]['address'].should.have.property('city').be.a('string')
                    res.body[0]['address'].should.have.property('streetAddress').be.a('string')
                    res.body[0].should.have.property('organizedBy').be.a('object')
                    res.body[0]['organizedBy'].should.have.property('companyName').be.a('string')
                    res.body[0]['organizedBy'].should.have.property('domain').be.a('string')
                    res.body[0]['organizedBy'].should.have.property('email').be.a('string')
                    res.body[0]['organizedBy'].should.have.property('contactPerson').be.a('object')
                    res.body[0]['organizedBy']['contactPerson'].should.have.property('firstName').be.a('string')
                    res.body[0]['organizedBy']['contactPerson'].should.have.property('lastName').be.a('string')
                    res.body[0]['organizedBy']['contactPerson'].should.have.property('email').be.a('string')
                    res.body[0]['organizedBy']['contactPerson'].should.have.property('phone').be.a('string')
                    done()
                })
        })
    })

    describe('Event filter testing', () => {
        describe('/GET events filter by name', () => {
            it('it should get all the events with nemo in name', (done) => {
                chai.request(server)
                    .get('/events?name_like=nemo')
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        for (const d of res.body) {
                            d.name.toLowerCase().should.contains('nemo')
                        }
                        done()
                    })
            })
        })

        describe('/GET events filter by startDate', () => {
            const today = (new Date()).getTime();
            it('it should return all the events after today', done => {
                chai.request(server)
                    .get(`/events?startTime_gte=${today}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        try {
                            for (const d of res.body) {
                                d.startTime.should.have.be.greaterThan(today)
                            }
                            done()
                        } catch (error) {
                            done(error)
                        }
                    })
            })
        })

        describe('/GET events filter by startDate interval', () => {
            const now = new Date()
            const today = (now).getTime();
            let next30Days
            if (now.getMonth() == 11) {
                next30Days = new Date(now.getFullYear() + 1, 0, 1);
            } else {
                next30Days = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            }
            next30Days = next30Days.getTime()
            it('it should return all the events beetween today and a month later', done => {
                chai.request(server)
                    .get(`/events?startTime_gte=${today}&startTime_lte=${next30Days}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        try {
                            for (const d of res.body) {
                                d.startTime.should.have.be.greaterThan(today)
                                d.startTime.should.have.be.lessThan(next30Days)
                            }
                            done()
                        } catch (error) {
                            done(error)
                        }
                    })
            })
        })
    })

    describe('Event pagination testing',()=>{
        describe('/GET events?_page=2',()=>{
            it('it should return the second page of events from id 10 to 19', done=>{
                chai.request(server)
                .get('/events?_page=2')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    res.body.should.have.lengthOf(10)
                })
                done()
            })
        })

        describe('/GET events?_page=5&_limit=5',()=>{
            it('it should return the fift page of events from id 20 to 24', done=>{
                chai.request(server)
                .get('/events?_page=5&_limit=5')
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    res.body.should.have.lengthOf(5)
                    res.body[0].id.should.be.equal(20)
                    res.body[4].id.should.be.equal(24)
                })
                done()
            })
        })
    })

    describe('Event sort testing', ()=>{
        describe('/GET events?_sort=name',()=>{
            it('it should return the events sorted by name asc', done=>{
                chai.request(server)
                .get('/events?_sort=name')
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    if(res.body.map(x=>x.name).every((v,i,a) => !i || a[i-1] <= v)){
                        done()
                    }else{
                        done(new Error('The returned event list is not sorted correctly'))
                    }
                })
            })
        })

        describe('/GET events?_sort=name&_order=desc',()=>{
            it('it should return the events sorted by name desc', done=>{
                chai.request(server)
                .get('/events?_sort=name&_order=desc')
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    if(res.body.map(x=>x.name).every((v,i,a) => !i || a[i-1] > v)){
                        done()
                    }else{
                        done(new Error('The returned event list is not sorted correctly'))
                    }
                })
            })
        })
    })
})

describe('Login and authentication',()=>{
    describe('/GET login?email=admin@email.com&pass=adminpass',()=>{
        it('it should return ok and the authenticatin cookie', done=>{
            chai.request(server)
            .get('/login?email=admin@email.com&pass=adminpass')
            .end((err, res)=>{
                const cookie = {authcookie:res.header['set-cookie'][0].split('=')[1] }
                assert.equal(cookie.authcookie, '666')
                assert.equal(res.text,'OK')
                done()
            })
        })
    })

    describe('/GET login?email=admin@wrong.com&pass=adminpass',()=>{
        it('it should return 401', done=>{
            chai.request(server)
            .get('/login?email=admin@wrong.com&pass=adminpass')
            .end((err, res)=>{
                res.should.have.status(401);
                done()
            })
        })
    })
})

describe('Add new event',()=>{
    describe('Unauthorized user',()=>{
        it('it should return status code 401', done=>{
            chai.request(server)
            .post('/events')
            .end((err,res)=>{
                res.should.have.status(401);
                done()
            })
        })
    })

    describe('Authorized user with body data error',()=>{
        it('it should return status code 422', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .end((err,res)=>{
                res.should.have.status(422);
                done()
            })
        })
    })

    describe('Authorized user with good body',()=>{
        it('it should return status code 201', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .send(newEvent())
            .end((err,res)=>{
                res.should.have.status(201);
                done()
            })
        })
    })
})

describe('Testing with multiple queries', ()=>{
    describe('Get all events', ()=>{
        it('it should return 1001 events', done=>{
            chai.request(server)
                .get('/events')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.have.lengthOf(1001)
                    done()
                })
        })
    })
    describe('Add event by unauthorized user, good body', ()=>{
        it('it should return status code 401', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=6667')
            .send(newEvent())
            .end((err,res)=>{
                res.should.have.status(401);
                done()
            })
        })
    })
    describe('Add event by unauthorized user, wrong body', ()=>{
        it('it should return status code 401', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=6667')
            .end((err,res)=>{
                res.should.have.status(401);
                done()
            })
        })
    })
    describe('Add event by authorized user, wrong body', ()=>{
        it('it should return status code 422', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .end((err,res)=>{
                res.should.have.status(422);
                done()
            })
        })
    })
    describe('Add event by authorized user, good body', ()=>{
        it('it should return status code 201', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .send(newEvent())
            .end((err,res)=>{
                res.should.have.status(201);
                done()
            })
        })
    })
    describe('Add event by authorized user, good body', ()=>{
        it('it should return status code 201', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .send(newEvent())
            .end((err,res)=>{
                res.should.have.status(201);
                done()
            })
        })
    })
    describe('Get all events', ()=>{
        it('it should return 1003 events', done=>{
            chai.request(server)
                .get('/events')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.have.lengthOf(1003)
                    done()
                })
        })
    })
    const currentEvent = newEvent()
    describe('Add event by authorized user, good body', ()=>{
        it('it should return status code 201', done=>{
            chai.request(server)
            .post('/events')
            .set('Cookie','authcookie=666')
            .send(currentEvent)
            .end((err,res)=>{
                res.should.have.status(201);
                done()
            })
        })
    })
    describe('Find the last inserted event by name', () => {
        it(`it should return the event with name: ${currentEvent.name}`, (done) => {
            chai.request(server)
                .get(`/events?name=${currentEvent.name}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    for (const d of res.body) {
                        d.name.should.equal(currentEvent.name)
                    }
                    done()
                })
        })
    })
})



