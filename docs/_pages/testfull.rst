Teljes működés tesztelése
-----------------------------

A következő részben a rendszer működését fogom tesztelni,
hogy az adatbázis változásoknak is megfelelően fog-e válaszolni.


**Példa kód**:

    .. code-block:: javascript

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

A fenti tesztsorozat beszúrásokat végez és ellenőrzi, hogy ezek valóban
megtörténtek-e vagy sem.
        

**Lefutás eredménye**:
    .. figure:: ../images/9.png
        :width: 600