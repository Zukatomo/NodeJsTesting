Get metódus tesztelése
-------------------------

Ebben a részben bemutatom, az általam írt REST API GET metódusainak a tesztelését.
Ezen metódusok segítségével lehet adatokat lekérdezni a szerverről,  különböző
paraméterek segítségével.


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

A fenti kód részletben a :literal:`\ \ describe` kulcsszó segítségével
definiálunk egy teszt blokkot, amely első paraméterként a teszteset leirását
kapja, majd második paraméternek egy lambda függvényt amely tartalmazhat egy
konkrét tesztesetet vagy további definiálásokat is.
        

Megfigyelhető, hogy a fenti kód az autentikáció nélküli lekérdezéseket vizsgálja,
ezen belül is az összes event lekérdezését.
Az :literal:`\ \ it` kulcsszó használatával definiálunk egy konkrét tesztet amely
szintén két paraméterrel rendelkezik, az első leírja, hogy mi kellene történjen a teszt során,
a második egy lambda függvény amely paraméterül egy függvényt kap, ezt a függvény kell
meghívni abban az esetben ha a tesztek jól futnak le.


Az API szerverről való lekérdezés :literal:`\ \ chai.request(server)` segítségével
hajtható végre. A kódban megfigyelhető, hogy egy :literal:`\ \ GET` metódus használatával
lekérdezzük az összes eseményt. A következő részben pedig ellenőrizzük, hogy
a szerver által szolgáltatott adatok helyes :literal:`\ \ status` kóddal térnek vissza,
ez jelen esetben a :literal:`\ \ 200`. Illetve, hogy a visszatérít egy tömb, amelynek 1000 eleme van.


**Hibátlan lefutás**:
    .. figure:: ../images/1.png
        :width: 600

        events helyes lefutása s 

**Hibás lefutás**:
    .. image:: ../images/2.png
        :width: 600

Hibás legutás esetén megfigyelhető, hogy megjelenik, melyik teszteset a hibás illetve,
hogy mi volt az elvárt érték, és milyen értéket kapott a szervertől.

GET by name
~~~~~~~~~~~~

Ebben a tesztesetben megpróbáljuk lekérdezni az összes létező eseményt a szerverről,
amely nevében szerepel a :literal:`\ \ nemo` szó.

**Példa kód**:

    .. code-block:: javascript
    
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

A fenti kódrészlet lekérdezni, az összes olyan eseményt amelynek a nevében szerepel a
:literal:`\ \ nemo` szó. Az ellenörzés során, megnézi, hogy a megfelelő státusz kóddal
érkezett meg a válasz, illetve, hogy ez egy tömb-e, majd végigjárja a tömb összes
elemét és megnézi, hogy tartalmazza-e a megfelelő szót. 

**Hibátlan lefutás**:
    .. figure:: ../images/3.png
        :width: 600
 

**Hibás lefutás**:
    .. image:: ../images/4.png
        :width: 600


GET sorted by name
~~~~~~~~~~~~~~~~~~~~~~~~

A következő részben azt tesztelem, hogy az API képes-e a visszatérítendő
adatokat rendezve visszaadni.


**Példa kód**:

    .. code-block:: javascript
    
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

A fenti kódrészlet lekérdezi az adatokat ellenőrizni, majd megnézni,
hogy név szerint rendezve vannak-e.

**Hibátlan lefutás**:
    .. figure:: ../images/5.png
        :width: 600
 

**Hibás lefutás**:
    .. image:: ../images/6.png
        :width: 600



.. toctree::
    :maxdepth: 1
 
    index