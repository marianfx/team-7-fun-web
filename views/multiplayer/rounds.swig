
<ul class="collapsible collapsible-accordion" data-collapsible="accordion">
	{% for question in questions %}
		<li>
			<div class="collapsible-header active">{{question.QUESTION}}</div>
			<div class="collapsible-body ">
				<div id="{{question.QUESTIONID}}" class="collection">
					<a class="qq collection-item 1">{{question.ANSWERA}}</a>
					<a class="qq collection-item 2">{{question.ANSWERB}}</a>
					<a class="qq collection-item 3">{{question.ANSWERC}}</a>
					<a class="qq collection-item 4">{{question.ANSWERD}}</a>
				</div>
			</div>
		</li>
	{% endfor %}
</ul>
