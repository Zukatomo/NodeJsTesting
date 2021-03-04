const faker = require('faker')

const newEvent= ()=>{
    return {
        id:0,
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
module.exports = () => {
    const data = {events:[]}
    for(let i =0; i< 1000; i++){
        data.events.push({...newEvent(), id:i})
    }
    return data
}