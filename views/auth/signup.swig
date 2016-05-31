{% extends '../mainlayout.swig' %}

{% block title %}Create account
  {% parent %}{% endblock %}

{% block head %}
  {% parent %}
  <link type="text/css" rel="stylesheet" href="./styles/auth/signup.css">
{% endblock %}

{% block content %}
  <div id="register-page" class="row">
    <div class="col s12 z-depth-4 card-panel">
      <form id="registerForm" class="login-form">

        <div class="row">
          <div class="input-field col s12 center">
            <h4>Register</h4>
            <p class="center">So, you want to join the community?</p>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">perm_identity</i>
            <label class="center-align" for="userTB">Username</label>
            <input id="userTB" name="userTB" class="user" type="text" data-error=".errorTxt1">
            <div class="errorTxt1 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <label class="center-align" for="emailTB">Email</label>
            <input id="emailTB" name="emailTB" class="email" type="email" data-error=".errorTxt2">
            <div class="errorTxt2 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <label class="center-align" for="passTB">Password</label>
            <input id="passTB" name="passTB" type="password" class="password" data-error=".errorTxt3">
            <div class="errorTxt3 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <label class="center-align" for="passagainTB">Repeat password</label>
            <input id="passagainTB" name="passagainTB" class="password" type="password" data-error=".errorTxt4">
            <div class="errorTxt4 righted"></div>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <a id="submitBtn" class="btn waves-effect waves-light red col s12">Register</a>
          </div>
          <div class="input-field col s12">
            <p class="margin center medium-small sign-up">Already have an account?
              <a href="/signin">Log in</a>
            </p>
          </div>
        </div>

      </form>
    </div>
  </div>
{% endblock %}

{% block footer %}
  {% parent %}
  <!--Import script for this page-->
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.min.js"></script>
    <script type="text/javascript" src="./js/auth/signup.js"></script>
{% endblock %}
