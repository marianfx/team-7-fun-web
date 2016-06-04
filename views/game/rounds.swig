{% extends '../mainlayout.swig' %}

{% block title %}Log-into the fun
	{% parent %}{% endblock %}

{% block head %}
	{% parent %}
	<link type="text/css" rel="stylesheet" href="styles/game/rounds.css">
	<link type="text/css" rel="stylesheet" href="styles/game/flipclock.css">
	<link rel="stylesheet" href="styles/game/normalize.css"/>
	<link rel="stylesheet" href="styles/game/ion.rangeSlider.css"/>
	<link rel="stylesheet" href="styles/game/ion.rangeSlider.skinFlat.css"/>
{% endblock %}

{% block content %}

	<!-- the timer -->
	<div class="clock" style="width: 300px; margin: auto;"></div>

	<div class="Questions">
		<ul class="collapsible collapsible-accordion" data-collapsible="accordion">
			{% for currQ in questions %}
				<li>
					<div class="collapsible-header {% if loop.first %} active {% endif %}">{{currQ.QUESTION}}</div>
					<div class="collapsible-body ">
						<div id="{{currQ.QUESTIONID}}" class="collection">
							<a class="qq collection-item 1">{{currQ.ANSWERA}}</a>
							<a class="qq collection-item 2">{{currQ.ANSWERB}}</a>
							<a class="qq collection-item 3">{{currQ.ANSWERC}}</a>
							<a class="qq collection-item 4">{{currQ.ANSWERD}}</a>
						</div>
					</div>
				</li>
			{% endfor %}
		</ul>
	</div>

	<button id = "submmitBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>







{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
	<script type="text/javascript" src="js/game/flipclock.js"></script>
	<script type="text/javascript" src="js/game/rounds.js"></script>
	<script type="text/javascript" src="js/game/ion.rangeSlider.js"></script>
{% endblock %}
