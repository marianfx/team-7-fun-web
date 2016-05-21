
{% extends '../mainlayout.swig' %}

{% block title %}Log-into the fun {% parent %}{% endblock %}

{% block head %}
	{% parent %}
	<link type="text/css" rel="stylesheet" href="styles/auth/signin.css">
{% endblock %}

{% block content %}
<div class="row form-div">
	<form class="col s5 z-depth-3 form-form" style="padding: 30px; padding-right: 40px;">
			<div class="row">
			  <div class="input-field">
				<i class="material-icons prefix">person_pin</i>
				<input id="userTB" type="text" class="validate">
				<label for="userTB">Username</label>
			  </div>
			</div>
			<div class="row">
			  <div class="input-field">
				<i class="material-icons prefix">lock</i>
				<input id="passTB" type="password" class="validate">
				<label for="passTB">Password</label>
			  </div>
			</div>

			<div class="row">

				<a id="submitBtn" class="righted btn waves-effect waves-light">
					<i class="material-icons right">done_all</i>
					Login
				</a>
				<a id="fbBtn" class="righted waves-effect waves-blue darken-4 blue btn">
					<i class="material-icons right">thumb_up</i>
					Connect
				</a>
			</div>

	</form>
</div>
{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
	<script type="text/javascript" src="js/auth/signin.js"></script>
{% endblock %}
