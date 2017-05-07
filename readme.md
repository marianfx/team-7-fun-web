<!-- Attention, this document is markdown document -->

# **Developer manual**

- **You may want to check out first**:

  - [About the application](https://github.com/marianfx/team-7-fun-web/blob/develop/about.md "View About page")
  - [Application Flow](https://github.com/marianfx/team-7-fun-web/blob/develop/app_flow.md "Application flow page. Continues the `about` section")
  - [Sails Documentation](http://sailsjs.org/documentation/concepts/)

# First Step - **Install sails**
  npm -g install sails (globally install)

# **1.1. Folders**
- /assets
  - contains all the static resources, modularized on sub-folders for each important section of the sites

      /robots.txt - for search engines

  - /api/responses/
    - custom (and predefined) responses
    - ex. **res.ok{"This is a cool message.", 'coolview'}**

- /config
    - maybe the most important folder, Here developer can configures the application (routes, policies, connections to the DB etc.)

# **2. Sails commands**
  sails new "project_name"  - create a new project   sails lift                - start the server       Obs: for ES6, install babel-cli + presets (es2015) and run app.js with babel-node

# **3. Blueprints**
- _**What is this?**_
  - Great sails API for for data modelling!

- **Model + Model Settings**      [http://sailsjs.org/documentation/concepts/models-and-orm/attributes](About attributes in Models)

  [http://sailsjs.org/documentation/concepts/models-and-orm/model-settings](Model Settings)
  - See: `/api/models/user.js`_

  Obs: most implicit actions have a callback too.

# _**4. Controllers **_
- Controllers should take the responsability of handling client requests.
- The `Actions` are the methods of a controller
- **Pattern**:
  - Controler: UserController.js
  - Actions:


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
  - the controller binds 2 actions to `GET user/hi` and `GET user/bye`

- **Obs:** On all actions, there must be the parameters: req (_request_) and res (_response_).
- **Obs2:** Controllers should keep up on small tasks, not become huge monolits (we use Services for that). See _socket.io - real time communication_.
- _**Explicit Controlling**_:
  - /config/routes.js
    - here we bind routes to Controllers and views

  - Simple: ` 'POST /make/a/sandwich': 'SandwichController.makeIt'`
    - explicatie: la adresa /make/a/sandwitch, va fi disponibila metoda makeIt din controllerul SandwitchController

  - -

# _**4.4. Views**_
- THey reside in two places: assets and views folder
- Folder hierarchy applies here
- THe routes from config/routes always override the one from assets if conflicts appear.
- [About views on Sails](shttp://sailsjs.org/documentation/concepts/views)

# _**5. Policies **_
- [About policies on Sails](http://sailsjs.org/documentation/concepts/policies)
- They controll when a controller can be accessed

    ProfileController:

    {

      '*': 'isLoggedIn',

      edit: ['isAdmin', 'isLoggedIn']

    }

    </code>

# _**6. Database scripts**_
  - the application uses Oracle
  - for deploying, certains scripts (from DB_Oracle folder) need to be runned
  - Order:
      1.	Project-init
      2.	data_manipulation
      3.	TWExceptions
      4. 	Game_Managament
      5.	player_package
      6. 	authentication
      7.	project-triggers
      8.	project-insert(sequences)
      9.  populate-items
      10.	populate-courses-rounds-questions
      11.	indexes

    -In order to make work in linux distribution mysql database you have to:
      1.  Open: $ sudo gedit /etc/mysql/my.cnf 
      2.  Add at the end of the file the following 
          - [mysqld]
            lower_case_table_names = 1
      3. $ sercive mysqld stop;
      4. $ sercive mysqld start;
      5. check if this variable was set to 1; ($ mysqladmin -u root -p variables)

# _**x. Real time communication**_
- Best use = multiplayer games (like Fun Web Uses)
-  [http://sailsjs.org/documentation/concepts/realtime](http://sailsjs.org/documentation/concepts/realtime)

  [https://github.com/langateam/sails-auth/blob/master/config/passport.js](https://github.com/langateam/sails-auth/blob/master/config/passport.js)

  [http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/](http://www.geektantra.com/2013/08/implement-passport-js-authentication-with-sails-js/)
