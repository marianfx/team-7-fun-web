<!-- Attention! This document is markdown. A Markdown viewer is recommended to read it. I personally recommended installing Atom code editor. It has a lot of plugins, one of them being Markdown Preview (Triggered with Ctrl + Shift + M). -->

 # **1\. Prerequisites**

- **1.1\. Atom**

  - To install / configure a package: Packages -> Settings View (in packages we can also find all the installed packages and their settings)
  - Other useful Atom plugins:

    - **Minimap** - minipam of the code, like in Sublime Text
    - **terminal-plus** - oepn terminal inside the editor (toggle through `Ctrl + ~`, open multiple with Alt + Shift + T)
    - **jshint** - validate Javascript inside Atom. Can be configured for ES5 or ES6 (ES6 supports classes and lambda expressions). Here, it is configured for ES6 (see package.json - jshintConfig {})
    - **atom-ternjs** - js intelligence for atom
    - **autocomplete**-x (eg autocomplete-html, autocomplete-javascript etc)
    - **javascript-snippets** - allows snippets (shortcuts) in atom. Ex. when I write 'cl' and press enter, it automatically writes for me console.log()
    - **atom-beautify** - beautifies the code (must select in the menu)
    - find more by yourself.

- **1.2\. Node & Sails**

  - To install **Node.js** - go to Node.js site and install version 4.4 (stable). Not 5 or 6!
  - To install **Sails**, go to <http://sailsjs.org> and familiarize with the site. Then, open a console with admin privileges (if you installed Atom, open it there, it already does that for you) and run the command `npm -g install sails` (what this means? start `npm`, `install` the thing globally (`-g`), the thing = `sails`.)
  - **Modules**. There are two modes you can install a module (modules can be found on <https://www.npmjs.com/> ) - **globally** or **locally** into a project.

    - We install globally only the huge modules, computer dependent modules etc. (eg. frameworks, like Sails), example was given above.
    - We install locally all the modules our app depends on (like passport, lodash, etc.). All the installed modules are found on `package.json` file. To install a module: `npn install --save x` - `install` the `x` module, saving it to the package.json file. This has also advanced features, like version-based installment and so on, but for now, this is the basic.

  - **Important** And, also - the modules are a huge, huge, number of c, js and other type of files. HUGE. HUGE. They are never uploaded to GIT. That's why the package.json file exists. **To install locally all of the prerequisite modules for the project , run `npm install`**
  - **Important** - some modules are written in C/C++. And need to be compiled after downloading. So, you need, on windows, to have Visual Studio Installed, with Visual C++ Checked when installing. Otherwise, you have to reinstall it. Also, Git Command line is necessary for some (they download their source files from git) (also needed for some Atom plugins)

  - **Starting the app**.

    - Normally, an application is started with `node app.js`, but we do not use this command (app.js = the name of the main application file). What a start file must do? Well, start the server part of the application and also prepare the client files for getting used.
    - In sails, we start the server with the `sails lift` but we also do not use this command because we do not like magic.
    - In `package.json` there is an object called `scripts`. You will find there that there are three starting scripts. The one we use is `"start": "babel-node app.js --presets es2015"`. Meaning? Well, There is this `babel-core` module which is able to let you write in an Node.js app javascript code formatted as well as in ES5 (normal JS), as well as in ES6 (classes, lambda etc.); By starting the app with babel-node, it's like using a scripting language (actually, JS is kindofa scripting language) - we first interpret all the ES6 code, transform it into ES5 code, and then start the `app.js`. If you take a look into the file, you will see that inside it uses `sails.lift` to actually start the application. So, the steps are - covert ES6 to ES5 and then lift the application. Further looking into the sails documentation, you will find out that before actually starting the application, there are also other processes going on automatically (like moving all the client-side scripts and getting them ready for using).
    - SO: `nmp start` is the command to start the application. `start` is the name from package.json/scripts.

- **1.3\. What we use?**

  - When we want to import a library on the server-side scripts, we use

    - In ES5: `var l = require('module-name')` eg. `var pass-local = require('passport-local')`
    - IN ES6: `import pass-local from 'passport-local'`
    - This library importing thing works the same for our own written modules, because when we write a JS file, it is basically an module.
    - The module exports can be done in different ways:

      - If we want to export a single object, that contains sub-functions (see example services/passport.js):

        ```
          In my__object.js:
            let obj_name = {module functions in here} (but, basically an object is the same as a function in JS)
            module.exports = obj_name;
          Then use it with:
            import my_module from 'my_object' (node, extensions are not needed)
            call my_module.function()
        ```

      - If we want to export a module which contains multiple objects (a file, let's say, in which we define, pragmatically speaking, two classes - see models/user):

        ```
          In my_objects.js:
            let obj_1 = {}
            let obj2 = {} ...
            export {obj1, obj2}
          Then use it:
            var x = require('my_objects').obj_1
            or
            import my_objects from 'my_objects'
            let obj1 = my_objects.obj_1
        ```

      - If we want to import an **folder** (which contains multiple modules):

        - Define each object collections in it's own file.
        - Create an `index.js` file (the index of that folder) which exports all the sub-modules
        - See `services/protocols` folder

- **babel-x** - The one we already talked about, allowing us to write ES6 code, which is nice.
- **bcrypt** - crypting, hashing library, used for password hashing and others (see users model)
- **grunt-x** - used by sails for deployment of client-side scripts (eg. uglify transforms readable JS code into unreadable JS code), automated scripts etc.
- **lodash** - easy collections operations in JS. See <https://lodash.com/> for API description.

# **2\. Updates**

- Anonymous functions `function() {} = functie () => {} = functie anonima`

  - Daca voi incerca sa referentiez 'this' in functia anonima, NU va functiona (duh)

- Basic functions in Javascript

  - A function in JS usually looks like this:

    ```
    let myfunc = function(param1, param2, ...., callback(p1, p2, ..)){
      function body;
      callback() -- depending on context, included on body
    }

    then, when it is called:
      myfunc(param1, param2, ..., function(p1, p2, ...){
          // here is the code for the callback function.
          Basically, we specify here what is executed after the myfunc has executed
          (myfunc knows what must call in the line of execution, cause they all flow)
        })
    ```

  - Deci am functia `myfunc` care e apelata cu o serie de parametri. Ea executa niste chestii, si trebuie sa stie cand si-a terminat treaba ce sa apeleze in continuare, in linia de executie. Chestia asta o stie pasandu-i parametrul callback, care e de fapt la randul sau o alta functie, cu parametri (cei de la programare functionala vor sti).
  - Cand vreau sa apelez functia, desigur pot sa-i furnizez aceasta functie de callback. De asemenea, pot sa nu i-o furnizez daca nu am nevoie.
  - De ex. daca am o functie care returneaza true sau false in functie de anumite conditii, nu am de ce sa-i dau o functie de callback, pentru ca ea imi furnizeaza direct rezultatul.
  - Now see `app_flow`.
