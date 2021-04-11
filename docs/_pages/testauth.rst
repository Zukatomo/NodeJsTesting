Autentikáció tesztelése
-----------------------------

Ebben a részben a felhasználó bejelentkezését fogom tesztelni,
illetve a hozzáadást az esemény listához.

GET Login
~~~~~~~~~~~~

A bejelentkezéshez, a felhasználónak el kell küldenie az email címét és
a jelszavát. Majd ha ezek helyesek akkor a szerver egy sütiben visszaküldi
a tokent. A későbbiekben ezzel a tokennel tudja igazolni a hitelességét.


**Példa kód**:

    .. code-block:: javascript
    
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

A fenti kódrészlet mutat példát helyes és helytelen bejelentkezésre.
Helyes bejelentkezés esetén a szerver a visszaküld egy
:literal:`\ \ authcookie` nevű  sütit, :literal:`\ \ 666` értékkel.
Helytelen bejelentkezés esetén pedig :literal:`\ \ 401` es státusz kódot.

**Lefutás eredménye**:
    .. figure:: ../images/7.png
        :width: 600

Esemény beszurása
~~~~~~~~~~~~~~~~~~~~~~~~

A következő részben egy új esemény beszúrását fogom tesztelni, amire csak
bejelentkezett felhasználónak van joga.


**Példa kód**:

    .. code-block:: javascript
    
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

A fenti kódrészlet több tesztet hajt végre egymás után amelyekben megpróbál
beszúrni egy új eseményt, rossz/jó felhasználó és adat párossal.
        

**Lefutás eredménye**:
    .. figure:: ../images/8.png
        :width: 600

.. toctree::
    :maxdepth: 1
 
    index