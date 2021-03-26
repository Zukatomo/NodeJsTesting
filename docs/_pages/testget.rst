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

A fenti kódrészletben a :literal:`\ \ describe` kulcsszó segitségével
definiálunk egy teszt blockot, amely első paraméterként a teszteset leirását
kapja, majd második paraméternek egy lambda függvényt amely tartamazhat egy
kokrét tesztesetet vagy további definiálásokat is.

Megfigyelhető, hogy a fenti kód az authentikáció nélküli lekérdezéseket viszgálja,
ezen belűl is az összes event lekérdezését.
Az :literal:`\ \ it` kulcsszó használatával definiálunk egy konkrét tesztet amely
szintén két paraméterrel rendelkezik, az első leirja, hogy mi kellene történjen a teszt során,
a második egy lambda függvény amely paraméterül egy függvényt kap, ezt a függvény kell
meghivni abban az esetben ha a tesztek jól futnak le.

Az API szerverről való lekérdezés :literal:`\ \ chai.request(server)` segitségével
hajtható végre. A kódban megfigyelhető, hogy egy :literal:`\ \ GET` methódus használatával
lekérdezzük az összes eventet. A következő részben pedig ellenőrizzük, hogy
a szerver által szolgáltatott adatok helyes :literal:`\ \ status` kóddal térnek vissza,
ez jelen esetben a :literal:`\ \ 200`. Illetve, hogy a viszatéritett egy tömb, amelynek 1000 eleme van.

**Hibátlan lefutás**:
    .. image:: ../images/1.png
        :width: 600

**Hibás lefutás**:
    .. image:: ../images/2.png
        :width: 600

Hibás legutás esetén megfigyelhető, hogy megjelenik, melyik teszt eset a hibás illetve,
hogy mi volt az elvárt érték, és milyen értéket kapott a szervertől.





.. toctree::
    :maxdepth: 1
 
    index