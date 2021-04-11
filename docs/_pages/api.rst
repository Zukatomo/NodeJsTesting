Az api egy egyszerű rendezvény kezelő rendszer valósít meg 
amelynek segítségével egy vendég felhasználó képes lekérdezni bármilyen
az adatbázisban lévő rendezvényt. Illetve bejelentkezés után, képes a
a már meglévő rendezvények listájához, egy újat hozzáadni.


A lekérdezés történhet a rendezvények bármely paramétere szerint,
illetve lapozással és rendezéssel is.

Az API fejlesztésénél `NodeJS <https://nodejs.org/en/>`__ alapú
futtatókörnyezetet használtam, amely a Google által fejlesztett
`V8 javascript engin <https://v8.dev/>`__-t használja a javascript futtatására.

NodeJS
=======

A Node.js egy szoftver rendszer, melyet skálázható internetes alkalmazások, mégpedig webszerverek készítésére hoztak létre[`4 <https://hu.wikipedia.org/wiki/Node.js>`__].
Nagy előnye, hogy a beérkező kérések aszinkron modon hajtódnak végre, igy
rengeteg, konkurens kérésre képes választani, anélkül, hogy a felhasználók
bármiféle teljesítmény visszaesését tapasztalatának.


JSON-server
=============

A `JSON Server <https://www.npmjs.com/package/json-server>`__ 
egy hamis REST API szerver amely rendkívül gyorsan üzembe helyezhető.
A legnagyobb előnye, hogy nem kell egy másik adatbázishoz csatolni,
csupán egy JSON típusú állományt kell hozzácsatolni, amely tartalmazza
az adatbázis szerkezetét és a benne lévő adatokat. Ez a fájl
a futás során nem módosul igy minden indításkor ugyanazon az 
adathalamzon lehet végezni a teszteket, amely a mostani feladathoz
nagyon előnyös.


A szerver képes kiszolgálni az adatokat illetve hozzáadni az adatbázishoz is, 
kisebb módosításokkal már képes a felhasználók által megadott adatok alapján
beléptetni őket és egy kulcsot küld nekik sütiken keresztűl amely segítségével
eldönti a későbbiekben, hogy az adott kérés milyen felhasználótól érkezett.


YUP
=====
A szerver egyik legfontosabb feladata, a felhasználóktól beérkező
adatok ellenőrzése, ezt egy `YUP <https://www.npmjs.com/package/yup?activeTab=readme>`__ 
nevű `NPM <https://www.npmjs.com/>`__ csomag használatával valósitottam meg.

A YUP egy rendkívül egyszerű de mégis nagyon hasznos csomag, amely 
obijektum séma validációt képes végezni, bármilyen javascript
tipuson.

A működéséhez, definiálni kell egy sémát amely használatával
a későbbiekben bármilyen beérkező objektumról el lehet dönei,
hogy megfelel-e az előre megadott sémának.


Séma példakód:

.. code-block:: javascript

    const yup = require('yup')
    const eventSchema = yup.object().shape({
        name:yup.string().required(),
        description: yup.string().required(),
        startTime: yup.number().positive().required()})

A fenti kódrészlet egy :literal:`\ \ eventSchema` modellt valósít meg amely
három adattagot tartalmaz, :literal:`\ \ name` egy szöveg típust
amely mindig kötelező, :literal:`\ \ description` egy leirás mező amely
szintén szöveg és kötelező, illetve egy :literal:`\ \ startTime` mezőt amely
egy pozitív szám és kötelező.
        

.. code-block:: javascript

    const isValidObj = eventSchema.isValid(eventObj)

A fenti kódrészlet igazat térit vissza abban az esetben, ha a bemeneti
:literal:`\ \ eventObj` obijektum telyesít mindent feltételt amelyet
az :literal:`\ \ eventSchema`-ban definiáltunk.

Autentikáció
===============

Az API autentikáció sütiken keresztül valósul meg
a felhasználó elküldi az email címét és a jelszavát
a bejelentkezéshez. A szerver ellenőrzi az adatokat
majd ha a beküldött adatok helyesek akkor a szerver
elküld a felhasználónak egy tokent amely a későbbiekben
azonosítja a szerver számára a felhasználót. 


.. toctree::
    :maxdepth: 1
 
    index