
Ebben a dokumentációban egy egyszerű REST API szerver tesztelését fogom bemutatni
`Mocha <https://mochajs.org/>`__ és `Chai <https://www.chaijs.com/>`__
keretrendszerek segítségével javascriptben, `NodeJS <https://nodejs.org/en/>`__
futtatókörnyezetben.

REST API
------------
A REST egy szoftverarchitektúra típus, elosztott kapcsolat (loose coupling), nagy, internet alapú rendszerek számára, amilyen például a világháló.[`1 <https://hu.wikipedia.org/wiki/REST>`__]


Az API (Application Programming Interface) definiciók és protokollok csoportja
amelyek segítségével épitünk egy alkalmazást. Általában ugy hivatkoznak rá mint
egy szerződésre ami az információ szolgáltató és a fogyasztó között van. [`2 <https://www.redhat.com/en/topics/api/what-is-a-rest-api>`__]
Az API egy előre leszögezett mondon biztositja, a szolgáltóhoz küldött kérések formátumát
és az általa visszaküldött válaszok tipusát. Ennek ismerete nagyban megkönnyiti a fejlesztök
dolgát, hiszen a két rendszert amelyet az api köt össze, párhuzamosan is lehet fejleszteni
hiszen, nem függnek szorosan egymástól.


Szoftvertesztelés
-----------------
A szoftvertesztelés a szoftverminőség-biztosítás és így a szoftverfejlesztés részét képezi. A tesztelés egy rendszer vagy program kontrollált körülmények melletti futtatása, és az eredmények kiértékelése. A hagyományos megközelítés szerint a tesztelés célja az, hogy a fejlesztés során létrejövő hibákat minél korábban felfedezze, és ezzel csökkentse azok kijavításának költségeit.[`3 <https://hu.wikipedia.org/wiki/Szoftvertesztel%C3%A9s>`__]

.. toctree::
    :maxdepth: 1
 
    index