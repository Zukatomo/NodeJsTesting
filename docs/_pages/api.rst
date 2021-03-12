Az api egy egyszerű rendezvény kezelő rendszer valósit meg 
amelynek segitségével egy vendég felhasználó képes lekérdezni bármilyen
az adatbázisban lévő rendezvényt. Illetve bejelentekés után, képes a
a már meglévő rendezvények listájához, egy ujat hozzáadni.

A lekérdezés történhet a rendezvények bármely paramétere szerint,
illetve lapozással és rendezéssel is.

Az API fejlesztésénél `NodeJS <https://nodejs.org/en/>`__ alapú
futtatókörnyezetet használtam, amely a Google által fejlesztett
`V8 javascript engin <https://v8.dev/>`__-t használja a javascript futtatására.

NodeJS
#######

A Node.js egy szoftverrendszer, melyet skálázható internetes alkalmazások, mégpedig webszerverek készítésére hoztak létre.[`4 <https://hu.wikipedia.org/wiki/Node.js>`__]
Nagy előnye, hogy a beérkező kérések aszinkron modon hajtódnak végre, igy
rengeteg, konkurens kérésre képes választani, anélkül, hogy a felhasználók
bármiféle telyesítmény visszaeszét tapasztalánának.

JSON-server
############

A `JSON Server <https://www.npmjs.com/package/json-server>`__ 
egy hamis REST API szerver amely renkivűl gyorsan üzembehelyezhető.
A legnagyobb előnye, hogy nem kell egy másik adatbázishoz csatolni,
csupán egy JSON tipusu állománt kell hozzácsatolni, amely tartalmazza
az adatbázis szerkezetét és a bennelévő adatokat. Ez a fálj
a futás során nem modosul igy minden inditáskor ugyanazon az 
adathalamzon lehet végezni a teszteket, amely a mostani feladathoz
nagyon előnyös.

A szerver képes kiszolgálni az adatokat illetve hozzáadni az adatbázihoz is, 
kisebb modositásokkal már képes a felhasználók által megadott adatok alapján
beléptetni őket és egy kulcsot küld nekik sütiken keresztűl amely segítségével
eldőnti a késöbbiekben, hogy az adott kérés milyen felhasználotól érkezett.

YUP
####
A szerver egyik legfontosabb feladata, a felhasználóktól beérkező
adatok ellenőrzése, ezt egy `YUP <https://www.npmjs.com/package/yup?activeTab=readme>`__ 
nevű `NPM <https://www.npmjs.com/>`__ csomag használatával valósitottam meg.

A YUP egy rendkivűl egyszerű de mégis nagyon hasznos csomag, amely 
obijektum séma validációt képes végezni, bármilyen javascript
tipuson.

A működéséhez, definiálni kell egy sémát amely használatával
a késöbbiekben bármilyen beérkező obijektumról el lehet dönei,
hogy megfelel-e az előre megadott sémának.

Séma példakód:

.. code-block:: javascript

    const yup = require('yup')
    const eventSchema = yup.object().shape({
        name:yup.string().required(),
        description: yup.string().required(),
        startTime: yup.number().positive().required()})

A fenti kódrészlet egy :literal:`\ \ eventSchema` modellt valósit meg amely
három adattagot tartlamaz, :literal:`\ \ name` egy szöveg tipust
amely mindig kötelező, :literal:`\ \ description` egy leirás mező amely
szintén szöveg és kötelező, illetve egy :literal:`\ \ startTime` mezőt amely
egy pozitiv szám és kötelező.

.. code-block:: javascript

    const isValidObj = eventSchema.isValid(eventObj)

A fenti kódrészlet igazat térit vissza abban az esetben, ha a bemeneti
:literal:`\ \ eventObj` obijektum telyesít mindent feltételt amelyet
az :literal:`\ \ eventSchema`-ban definiáltunk.

Authentikáció
################

Az API authentikáció sütiken keresztűl valósúl meg
a felhasználó elküldi az emailcimét és a jelszavát
a bejelentkezéshez. A szerver ellenőzrni az adatokat
majd ha a beküldött adatok helyesek akkor a szerver
elküld a felhasználónak egy tokent amely a késöbbiekben
azonositja a szerver számára a felhasznlót. 

.. toctree::
    :maxdepth: 1
 
    index