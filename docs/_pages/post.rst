POST methódus
##############

A POST használatával egy bejelentkezett felhasznaló képes uj eseményt hozzáadni.


.. http:post:: /events/

    Beszur egy új eseményt a következő szabad azonosító számmal.

    **Példa lekérdezés**:

    .. tabs::

            .. code-tab:: http

                POST /events HTTP/1.1
                Host: http://localhost:3000
                Content-Type: application/x-www-form-urlencoded
                Set-Cookie: authToken={token}

                data

            .. code-tab:: python

                import requests
                URL = 'http://localhost:3000/events'
                response = requests.post(URL, data=data, cookies={authToken={token}})
                print(response.json())

    Ahol ``data`` egy esemény tipus.

.. note::
    Az ``id`` megadásával paraméterben, egy általunk megadott azonositóval fog az adatbázisba kerülni.


.. toctree::
    :maxdepth: 1
 
    index