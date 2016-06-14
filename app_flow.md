# The general flow of an Sails Application
1. The **routes** configuration. The routes represent all the accessible paths of the application. Because we use MVC, the routes will be controlled by the app controllers. See `config/routes`
2. The **policies** configuration. Policies are basically the authorization of an app. What somebody can or cannot do, based on some rules. So, when an user tries to access an controller, it first must go through some policies. The configuration is in `config/policies` - where we specify what policy is defined for which controller. Then, the actual code of the policies is defined in `api/policies`, in it's own JS file (observe that it's single-object export type, uses module.exports).
3. The **Model** & **Controller**. These two work hand in hand. Each model has an controller associated (but an controller can exist without a model, see AuthController which has no model associated). Sails parses automatically the Models & Controllers specified in the specific folders. So, if we have a model `User` we will name it's controller `UserController` and it will be accessed in the app with `/user`.
4. 3.1. The **Services**. All the logic of the application (server) should be organized in services. And the controllers will call the services. **Modularization**
5. Check ReadMe.MD and the UserController.js and Sails documentation about how the Controllers work. They have the so-called blue-prints, meaning the CRUD operations associated with the REST api automatically created for each model (and there are some variables which can say let's deactivate this blueprints)
6. For database config, Sails has the Waterfall ORM and it automatically transposes the models to the database. Meaning if you do not have the database, but have the model, you can specify in the model the fields of the table which will be associated to it in the DB (as I worked till now, see the user model). But also, if in the model it is not specified any attributes and they exist in the database, they are automatically binded. Yeii!!!
7. To config the database engine - eg. put the fucking ORACLE - we must go, yes, you guessed (hopefully) to the config folder.
  - First, go to the connections.js file and add (if inexistent) the configuration for the desired engine (eg. Oracle). The thing is that the fucking Oracle is not fully officially supported by ORMs in almost none of the programming languages (because it's shitty), so to do this we would need to instale a npm module (something called sails-oracle or smth like that)
  - Second in line, go to models.js and uncomment the filed `connection`: ... and add the name of the engine you specified in the connections.js
  - And that's it. Now we're magically binded to the Database.
  - Must do some reasearch on how to call procedures and stuff like that (because queries work like magic - see ReadMe.md)

# example - flow of the logging in process (local mode)
1. User acceses `/auth/local` and sends an json with the auth data (username and password fields)
2. Here comes the `AuthController` (which is associated on this route in routes.config, on this path having the `action` (function) `callback`).
3. But in policies we also have a policy for the controller. AuthController must have the `passport` policy (which basically assures that passport is loaded / instantiated)
4. All ok => the `callback` action from `AuthController` is called. Here, it assures all the passport strategies are loaded, and then calls the `callback (req, res, function(error, user, message))` from the `services directory`. So we provide a callback function with an possible error, an user object (for successfull login) and an optional message (to send to the client eg. on invalid pass). In the callback, we check for errors, and send the message to the user. So, because of modularization, we separate the concepts. Here, the controller only calls an service, gets the results and based on the results, talks to the client. The controller basically does that, talks to the client (eg. view.)
5. The `callback` function from the `passport service` simply checks the provider (local) and the action (we might call register). If a normal call is being done. it simply calls the `authenticate(provider, function)` function from the passport module.
  - `authenticate(provider, next)` means let's initialize the authentication method for the specified provider (eg. local) and pass it the callback function (next - which is being passed over from the controller)
  - `authenticate(provider, next)(req, res, req.next)` means we initialize the authenticate and then call it with the request, response data.
  - -`req` and `res` are the most basic Node.js Objects added by Express framework (remember, Sails is built on Express).
    - The req object represents the request from the user (here is the session data, cookie data, here we can specify variables to send through the session to the user, here we can get the data sent through the session from the user etc.)
    - The res object is the response. Has basic functions like `res.send(data)`, `res.render(view)`, `res.forbidden()` and all the responses defined in `api/responses`

6. If we observe the `loadStrategies` function, it is basically the initializer for passport. So, when authenticating local-mode, the `authenticate` method is actually the `login` method from `api/services/protocols/local` defined by me which queries the DB (so, here we can see how nicely the ORM works)
7. So, because of the callback, `authenticate` function will actually invoke the callback we defined in the controller, defined at point 4. If succeded, will save the session, send the user to the client and a nice message.

# Responses
- See api/responses. Sails already defines some responses we can send to the user: res.ok(), res.forbidden(), res.notfound() etc.
- We MUST use these. For example when a user is not allowed to do something, we send him the forbidden response, aventually with a message, so the client can know what to do.

# Directives
## -- Security & users
Obs: To check if user is trying to update it's own data, we have the _itsMe_ policy.

POST /register
- what? creates an user
- request: json, with at least username, email and password fields (because required is true). Other fields - user model
- response: success, error

POST auth/local
- what? logins an user
- request: {username: 'xxx', pasword: 'xxx'} (through https, so secure)
- response: "{message: 'message' (Success on success, Invalid Pass etc)}"

GET user/me
- get current logged in info (available only when logged)
- response: user data

GET user
- what? get all users (no passwords, of course)
- needs to be logged in

GET user/:id
- what? get that user
- needs to be logged in

POST user/update
- what: update some info about the user (including username?) (also available only for logged in user)
- request: {id: xx, .... fields to update..}
- response: the new user json

credits {     "username": "mfx",     "password": "sixtynine" } createUser {     "username": "mfx",     "password": "sixtynine",     "email": "marian.focsa@outlook.com" }
