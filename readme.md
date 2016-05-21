<!-- Attention, this document is markdown document -->

# **1. Install sails**
  npm -g install sails (instalare globala)

# **1.1. Folders**
- /assets
  - contine toate resursele statice
  - se comporta exact ca folderul public (index.html = pagina, are favicon, js, css etc)
  - templates
  - !IMP: Daca in middleware-ul (express) definesc rute care se suprapun cu assets, acelea au intaietate.

      /robots.txt - for search engines

    /tasks

  - contine taskuri automate pentru grunt (minificare js, compilare less etc.)
  - need to look it up later
  - /config
    - all the configurations are here
    -   /routes.js - configure application routes with views / controllers for models
    - accesate prin **sails.config.x** _(ex. sails.config.port)_

  - /api/responses/
    - custom (and predefined) responses
    - apelate din response (res), sub patternul res.nume_respomse(parametri)
    - pot fi folosite cele default, au 2 parametri, un obiect + al doilea care daca e un string, va duce la randarea unui views
    - ex. **res.ok{message: "smechere"}**

# **2. Sails commands**
  sails new "project_name"  - create a new project   sails lift                - start the server       Obs: for ES6, install babel-cli + presets (es2015) and run app.js with babel-node

# **3. Blueprints**
- _**What is this?**_
  - APIs for data modelling!
  - sails generate api user
    - creeaza un model si un controller : User si UserController
    - de obicei, daca modelul are numele X, controllerul are numele XController, ca sa poata lucra Sails cu el.
    - sails genereaza automat actiunile implicite
    - modelul e reprezentat gol in X.js => va fi creat dinamic la inserare (by default un id + dateAdded)
    - pentru patternul code model => db model, specific modelul user

- **Model + Model Settings**      [http://sailsjs.org/documentation/concepts/models-and-orm/attributes](http://sailsjs.org/documentation/concepts/models-and-orm/attributes)

  [http://sailsjs.org/documentation/concepts/models-and-orm/model-settings](http://sailsjs.org/documentation/concepts/models-and-orm/model-settings)
  - _Vezi: `/api/models/user.js`_

  Obs: toate actiunile implicite au si un callback. :-?

- _**Actiuni implicite**_:
  - exista pentru fiecare model creat si pot fi accesate, salvand, actualizand, stergand etc. din baza de date din spate (care poate fi aleasa)
  - Obs: Waterline (ORM-ul de la Sails, care e folosit pentru lucrul cu baza de date pentru aceste actiuni implicite) construieste automat un camp, primary key, indexata, pentru un model
    - find
      - GET /nume_model [?filters] ([ ] = poate lipsi, filtrele pot fi trimise si ca JSON, separate prin virgula)
      - nume_model.find(json_object)
      - FILTRE:
        - nume_atribut = valuare... (WHERE x = ?).   {"nume_atribut": valoare}
        - where = {mai multe criterii}.              {"where": {"name": {"contains": "a"}, "lname": {"startsWith": "b"}}} - pot folosi criterii mai avansate
        - skip/limit = x                             {"skip": 20, "limit": 10} - used in pagination
        - sort = nume_atribut%20ASC/DESC
        - populate -- populeaza un vector cu modelul din db, putand fi editat / salvat cu .save() -- [http://sailsjs.org/documentation/reference/waterline-orm/populated-values](http://sailsjs.org/documentation/reference/waterline-orm/populated-values)
        - details [https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md](https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md)

    - findOne
      - GET /model/id
        - returneaza o unica intrare cu valoarea de primary key (poate fi id sau altceva)

    - create
      - POST /:model - modelul fiind format JSON
      - creaza un obiect nou obiect cu un nou id

    - update
      - PUT /:model/:id {json with attribute: value}
      - actualizeaza atributul specificat, pentru modelul cu id-ul precizat
      - se precizeaza ID-ul (peste tot) pentru a identifica unic obiectul
      - altfel, ar putea fi gasit cu find

    - destroy
      - DELETE /:model/:id
      - ghici

    - add/remove
      - PUT/DELETE /:model/:m_id/:association/:fk
      - adauga / sterge o asociere dintre 2 modele

# _**4. Controllers **_
- Controllerele sunt cele ce raspund la request-uri catre Server
- Pentru a fi create automat (si accesate prin GET /path/to/controller/action), in `/api/controllers/` creez fisierul nume+Controller.js (asa, sails il ia automat)
- `Actiunile` (en actions) reprezinta functiile ce vor raspunde la Controller
- **Pattern**:
  - Controler: UserController.js
  - Actions:

  <code>

  ```
  //UserController.js
  module.exports = {
  hi: function (req, res) {
    return res.send("Hi there!");
  },
  bye: function (req, res) {
    return res.redirect("http://www.sayonara.com");
  }};
  ```

  </code>
  - codul returneaza 2 actiuni, care vor fi accesate la `GET user/hi` respectiv `GET user/bye`

- **Obs:** toate functiile pentru actiuni au parametrii req (_request_) si res (_response_). La express exista si next, prin care se putea furniza o functie care putea face o / anumite verificari. Aceasta **NU** se foloseste aici. Vezi **Policies**.
- **Obs2:** controllerele ar trebui sa faca doar un lucru. Pentru a putea fi refolosite. Nu ar trebui sa se ocupe de requesturi super mari, ci sa fie parti al unui intreg. Vezi si _socket.io - real time communication_.
- _**Controllere explicite**_:
  - /config/routes.js
    - aici se configureaza rutele explicite (inclusiv pentru view-uri)

  - Simple: ` 'POST /make/a/sandwich': 'SandwichController.makeIt'`
    - explicatie: la adresa /make/a/sandwitch, va fi disponibila metoda makeIt din controllerul SandwitchController
      - Obs: calea tre sa fie completa:
        - `'/do/homework': 'stuff/things/HomeworkController.do'` (daca controllerul se afla in alta parte, totul relativ la fodlerul controllers)
        - [http://sailsjs.org/documentation/concepts/controllers/routing-to-controllers](http://sailsjs.org/documentation/concepts/controllers/routing-to-controllers)

    - **Obs:** calea poate fi definita si ca obiect JSON, eg `'POST /login': {controller: '', action: ''}`

# _**4.4 Custom middleware**_
- controllerele, actiunile, reprezinta middlewares. Sunt chestiile care sunt folosite pentru a capta requesturi de la client si a le trata, pot fi regasite in obiectul sails.config de cele mai multe ori.
- sails e bazat pe Express / Connect
- Pentru a adauga un middleware:
  - /config/my_middleware.js (acesta va fi injectat automat in sails.config.my_middleware)
  - de asemenea, poate fi pus ca un custom http middleware in config/http.js, unde poate fi precizata si ordinea de incarcare. Dar nu va fi folosita la alt fel de requesturi (gen _websockets_)
  - -

# _**4.5. Views**_
- Pot exista in doua locuri: folderul assets sau folderul views
- Se aplica ierarhia pe foldere
- daca vreau automat un view pentru un controller numit „auth", creez in views folderul „auth" si pun view-ul aici, cu numele actiunii
- Rutele specificate in config/routes vor suprascrie mereu pe cele care rezulta din ierarhia de foldere din assets.
- [http://sailsjs.org/documentation/concepts/views](http://sailsjs.org/documentation/concepts/views)

# _**5. Policies **_
- [http://sailsjs.org/documentation/concepts/policies](http://sailsjs.org/documentation/concepts/policies)
- Ce inseamna: cand cineva poate accesa un controller.
- Cum?
  - Pentru fiecare controller dorit, se pune cate o polita pentru actiunile sale din interior.
  - Politele = module, care exporta functii cu 3 parametri (req, res, next)
  - Exemplu:

    <code>

    ProfileController:

    {

      '*': 'isLoggedIn',

      edit: ['isAdmin', 'isLoggedIn']

    }

    </code>

# _**x. Real time communication**_
- [http://sailsjs.org/documentation/concepts/realtime](http://sailsjs.org/documentation/concepts/realtime)

  [https://github.com/langateam/sails-auth/blob/master/config/passport.js](https://github.com/langateam/sails-auth/blob/master/config/passport.js)

  [http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/](http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/)
