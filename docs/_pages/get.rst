GET request
++++++++++++

A GET segítségével eseményeket lehet lekérdezni, különbőző paraméterek szerint,
illetve a bejelentkezés is ezt a protokollt használja.

.. http:get:: /events/

        Visszatériít egyetlen egy eseményt a megadott azonosító szerint.

        **Példa lekérdezés**:

        .. tabs::

            .. code-tab:: http

                GET /events HTTP/1.1
                Host: http://localhost:3000
                Accept: application/json, text/javascript

            .. code-tab:: python

                import requests
                URL = 'http://localhost:3000/events'
                response = requests.get(URL)
                print(response.json())

            .. code-tab:: javascript

                fetch('http://localhost:3000/events')
                .then(response => response.json())
                .then(data => console.log(data));

        **Példa válasz**:

        .. sourcecode:: json

            [
                {
                "id": 0,
                "name": "Fugiat repellat necessitatibus deserunt sunt autem.",
                "description": "Earum mollitia fuga libero rem omnis nesciunt voluptatem ut sint. Quia recusandae unde qui architecto consequatur. Enim voluptatem vero ipsum vero dolor placeat voluptatem voluptatem sapiente. Culpa quia pariatur aut amet et ratione debitis. Mollitia earum dicta nemo dicta.",
                "startTime": 1639787235229,
                "address": {
                    "country": "Vietnam",
                    "county": "Bedfordshire",
                    "city": "New Millieshire",
                    "streetAddress": "97953 Okuneva Centers"
                },
                "organizedBy": {
                    "companyName": "Crona and Sons",
                    "domain": "georgiana.net",
                    "email": "Andrew_Hirthe35@gmail.com",
                    "contactPerson": {
                    "firstName": "Miss Lamar Welch",
                    "lastName": "Schmitt",
                    "email": "Sid.Ratke@hotmail.com",
                    "phone": "473.918.0217"
                    }
                }
                }]

.. http:get:: /events/{id}

    Visszatéríti az összes eseményt amely az adatbázisban szerepel.

    **Példa lekérdezés**:

    .. tabs::

        .. code-tab:: http

            GET /events HTTP/1.1
            Host: http://localhost:3000/25
            Accept: application/json, text/javascript

        .. code-tab:: python

            import requests
            URL = 'http://localhost:3000/events/25'
            response = requests.get(URL)
            print(response.json())

        .. code-tab:: javascript

            fetch('http://localhost:3000/events/25')
            .then(response => response.json())
            .then(data => console.log(data));

    **Példa válasz**:

    .. sourcecode:: json

        {"id": 25,
        "name": "Et doloribus modi quisquam qui deleniti beatae repellat.",
        "description": "Repellendus ipsam similique magnam praesentium omnis iste suscipit mollitia. Aliquam tenetur commodi earum. Ipsam earum velit reiciendis vero ratione vero error ipsa. Repellat minima blanditiis voluptas in non. Eos doloribus corrupti eligendi dolor excepturi vero similique ut.",
        "startTime": 1642029075426,
        "address": {
            "country": "Saint Kitts and Nevis",
            "county": "Borders",
            "city": "New Carolynbury",
            "streetAddress": "4193 Phoebe Roads"
        },
        "organizedBy": {
            "companyName": "Lesch Group",
            "domain": "barbara.biz",
            "email": "Mason14@hotmail.com",
            "contactPerson": {
            "firstName": "Laverne Emmerich",
            "lastName": "Spinka",
            "email": "Delmer_Renner97@yahoo.com",
            "phone": "(635) 977-6556 x1724"
            }
        }

.. note::
    A lekérdezések során lehet keresést, lapozást vagy rendezést használni.

    :Query Parameters:

         * **name** (*string*) -- Konkét esemény név szerint keres.
         * **name_like** (*string*) -- Visszatériíti azokat az elemeket amelyeknek a neve tartalmazza a keresett szót.
         * **_page** (*number*) -- Visszatériíti az elemeket a megfelelő oldalról, az alapértelmezett oldalméret 10.
         * **_limit** (*number*) -- Egy oldalon megjelenő események maximális száma.
         * **_sort** (*string*) -- Rendezés egy atributum szerint.
         * **_order** (*string*) -- A rendezés iránya, növekvő ``asc``, csökkenő ``desc``.

Authentikáció
++++++++++++++

    A POST mehtódusok csak egy bejelentkezett felhasználó számára
    engedélyezetettek.

    A bejelentkezés során a felhasználónak el kell küldeni az emailcimét és a jelszavát.

.. http:get:: /login

    Sikeres bejelentkezés esetén visszatériít egy azonositó kulcsot, sütikben.

    **Példa lekérdezés**:

    .. tabs::

        .. code-tab:: http

            GET /events HTTP/1.1
            Host: http://localhost:3000?email={email}&pass={password}
            Accept: application/json, text/javascript

        .. code-tab:: python

            import requests
            URL = 'http://localhost:3000/events?email={email}&pass={password}'
            response = requests.get(URL)
            print(response.json())

        .. code-tab:: javascript

            fetch('http://localhost:3000/events?email={email}&pass={password}')
            .then(response => response.json())
            .then(data => console.log(data));

    