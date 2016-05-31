
{% extends '../mainlayout.swig' %}

{% block title %} Login  {% parent %}{% endblock %}

{% block head %}
	{% parent %}
	<link type="text/css" rel="stylesheet" href="./styles/auth/signin.css">
{% endblock %}

{% block content %}
<div id="login-page" class="row">
	<div class="col s12 z-depth-4 card-panel">
		<form id="loginForm" class="login-form">

			<div class="row">
				<div class="input-field col s12 center">
						<img src="images/logo.png" alt="" class="circle responsive-img valign profile-image-login">
						<p class="center login-form-text">Log into the Fun Web</p>
				</div>
			</div>

			<div class="row margin">
			  <div class="input-field col s12">
						<i class="material-icons prefix">perm_identity</i>
						<label class="center-align" for="userTB">Username</label>
						<input id="userTB" name="userTB" type="text" data-error=".errorTxt1">
            <div class="errorTxt1 righted"></div>
			  </div>
			</div>

			<div class="row margin">
			  <div class="input-field col s12">
						<i class="material-icons prefix">lock</i>
						<label class="center-align" for="passTB">Password</label>
						<input id="passTB" name="passTB" type="password" data-error=".errorTxt2">
            <div class="errorTxt2 righted"></div>
			  </div>
			</div>

			<div class="row">
				<div class="input-field  col s12">
						<a id="submitBtn" class="btn waves-effect waves-light col s12 red darken-2">Login</a>
				</div>
				<div class="input-field  col s12">
						<a href="/auth/facebook/" id="facebookBtn" class="btn btn-small waves-effect waves-light col s12 blue darken-3">Facebook</a>
				</div>
				<div class="input-field col s12">
					<p class="margin center medium-small sign-up">Don't have an account?
						<a href="/signup">Register</a>
					</p>
				</div>
			</div>


	</form>
</div>
{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/additional-methods.min.js"></script>
	<script type="text/javascript" src="./js/auth/signin.js"></script>
{% endblock %}
