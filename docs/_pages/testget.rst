Get methódus tesztelése
-------------------------

Ebben a részben bemutatom, az általam irt REST API GET metódusainak a tesztelését.
Ezen metódusok segitségével lehet adatokat lekérdezni a szerverről,  különbőző
paraméterek segitségével.

GET all
~~~~~~~~~~~~


Ebben a tesztesetben megpróbáljuk lekérdezni az összes létező eseményt a szerverről.

**Példa kód**:

    .. code-block:: javascript
    
        describe('Events withouth auth', () => {
        describe('/GET events', () => {
            it('it should GET all the books with correct types', (done) => {
                chai.request(server)
                    .get('/events')
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        res.body.should.have.lengthOf(1000)
                        done()
                    })
            })
        })




.. toctree::
    :maxdepth: 1
 
    index