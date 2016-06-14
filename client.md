# 1. Template engine
  - Why? We want to reuse `layouts`. So, we create a `template` for something, then `render` it from the server with our desired data (eg. for questions displaying).
  - Usually a template has an `layout` (general position of the content - eg `mainlayout.swig` which contains the html document) and content derived from that layout (eg `views/auth/signin.swig`) which uses the mainlayout and implements / overrides parts of it
  - The template engine chosen is `swig` (http://paularmstrong.github.io/swig/) because is simple and intuitive (recommended by some stackoverflow users). Check out the two (layout + implementation) to see how simple it is. Also it has good documentation.

# Code organisation
  - The `views` folder will contain subfolders with each `part` (eg. view, eg template) of the application named mostly with a simple name referring what it implements. For example, the `auth` deals with authentication, so will contait signin, register etc.
  - These views are also `configured `in Sails. in `config/views` we define the template engine (Sails supports Swig, it default came with `EJS`, but EJS kind of sucks at layouting and had some automated scripts which also sucked). The views are `rendered` in `routes`.

  - The `assets` folder is the main thang of the client (view). It will automatically be lifted to the client when the applications starts up. It contains CSS, JS and others needed for the views in the `views` folder.
  - The main folders are: `images` - guess what it contains?, `js` - the javascript, `styles` - CSS, Fonts, etc. There is also a favicon.
  - Each of these main folders should contain at their root the files needed for all of the pages.
    - For example, our all-site design will be the Google Material Design (from Android, Google now implements it kindof everywhere), so we use the **Materialize.css** (http://materializecss.com/ - check out, how simple it is to use their objects). Materialize.css has a `css file`, some `font files` and a `js file`. These are in the root directories of the `js` and `css` folders. Meaning they are used everywhere in the app (see also that they are imported in the mainlayout).
  - The pages using certain particular scripts, css etc (and those scripts do not need to be displayed on other views), should have each their own folder in each of the 'images / js / css' folders. For example, the `signin` page - Uses it's own javascript - `signin.js`, it's own particular css - `signin.css`, and it is grouped in the `auth` folder. Hope it makes sense.

  - Also, observe the `dependencies/sails.io.js`. It's a smart implementation of WebSockets for the client, made by Sails (see http://socket.io/ - this is how our multiplayer will work, with TCP Websockets. Made some samples from there, it's actually easy.). On Socket.io (and other Websockets implementations) there are always 2 parts - the client side and the server side. It's based on named-events, one part fires the event, the other one listens for that event, and when it fires it does something (and also viceversa)).

  - To be continued..

# AJAX
  - As you might have observed, jQuery is kind of a must in all of the client-side scripts. So, yes, every page has jQuery imported (in mainlayout). jQuery implements AJAX. See in `signin.swig` an example of jQuery call to the server API. That's what we'll use everywhere, so we might make a function for this, with a callback for success / failure (so we do not have to write the whole code everytime).
  - So, you might also take a look at the JQuery API. It's cool, it has functions for all of those DOM processing discussed on the course.
