
	<!-- the timer -->
	<div class="clock" style="width: 300px; margin: auto;"></div>

	<script>
	clock = $('.clock').FlipClock({{time}}, {
		clockFace: 'MinuteCounter',
		countdown: true,
		autoStart: true,
		defaultLanguage: 'ro',
		callbacks: {
			stop: function() {
				if(!isCancel){
					swal({
							title: "Sorry..",
							text: "You exceeded your time!",
							type: "error",
							allowEscapeKey: false,
							allowOutsideClick: false,
							showConfirmButton: false
					});

					setTimeout(function(){
						swal.close();
						setTimeout(function(){
							window.location.href = "/game";
						},
						1000);
					},
					3000);
				}
			}
		}
	});
	</script>

	<div class="Questions" style="padding-bottom: 20px;">
		<ul class="collapsible popout collapsible-accordion" data-collapsible="accordion">
			{% for question in questions %}
				<li>
					<div class="collapsible-header {% if loop.first %} active {% endif %}"><strong>{{question.QUESTION}}</strong></div>
					<div class="collapsible-body ">
						<div id="{{question.QUESTIONID}}" class="collection">
							<a class="qq collection-item 1" style="cursor: pointer;">{{question.ANSWERA}}</a>
							<a class="qq collection-item 2" style="cursor: pointer;">{{question.ANSWERB}}</a>
							<a class="qq collection-item 3" style="cursor: pointer;">{{question.ANSWERC}}</a>
							<a class="qq collection-item 4" style="cursor: pointer;">{{question.ANSWERD}}</a>
						</div>
					</div>
				</li>
			{% endfor %}
		</ul>
		<button id = "submmitBtn" class="btn waves-effect waves-light" type="submit" name="action">Submit
			<i class="material-icons right">send</i>
		</button>

	</div>
