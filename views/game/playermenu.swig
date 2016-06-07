<!-- The user data / details row -->
<li class="user-details cyan darken-2">
<div class="row">
  <!-- profile picture -->
  <div class="col col s4 m4 l4">
    <img src="{{ data.user.PHOTOURL }}" alt="{{ data.user.PLAYERNAME }}" class="circle responsive-img valign profile-image" data-pin-nopin="true">
  </div>

  <div class="col col s8 m8 l8">
    <!-- Name with dropdown-menu -->
    <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown">
      {{ data.user.PLAYERNAME }}
      <i class="material-icons">toc</i>
    </a>

    <!-- Drop down menu with links to profile -->
    <ul id="profile-dropdown" class="dropdown-content" style="width: 128px; position: absolute; top: 57px; left: 101.234px; opacity: 1; display: none;">
      {# <li>
        <a href="#">
          <i class="large material-icons">settings</i>Profile</a>
      </li> #}
      {# <li>
        <a href="#">
          <i class="material-icons">credit_card</i>
          Donate
        </a>
      </li> #}
      <li class="divider"></li>
      <li>
        <a href="/logout">
          <i class="material-icons">settings_power</i>Log out</a>
      </li>
    </li>
  </ul>

  <!-- User level -->
  <p class="user-level">
    <b>Level {{ data.user.PLAYERLEVEL }}</b>
    <span class="right">
      {{ data.user.EXPERIENCE }} /
      <b>{{ data.user.nextlvl }}</b>
    </span>
  </p>
</div>
</div>
</li>

<!-- Information about user here -->

<!-- Friends -->
<li class="no-padding">
<ul class="collapsible collapsible-accordion">
<li class="bold">
  <a class="collapsible-header waves-effect waves-cyan">
    <i class="mdi-social-people"></i>
    Friends</a>
  <div class="collapsible-body">
    <ul>
    {% if data.friends.length == 0 %}
      <li>
        <a href="#">You're solo here.</a>
      </li>
    {% endif %}

    {% if data.friends.length > 0 %}
      {% for friend in data.friends %}
        <li>
          <a href="#">friend.PLAYERNAME</a>
        </li>
      {% endfor %}
    {% endif %}
    </ul>
  </div>
</li>
</ul>
</li>

<!-- COURSES -->
<li class="no-padding">
<ul class="collapsible collapsible-accordion">
<li class="bold">
  <a class="collapsible-header waves-effect waves-cyan">
    <i class="mdi-communication-live-help"></i>
    Courses</a>
  <div class="collapsible-body">
    <ul>
    {% if data.courses.length == 0 %}
      <li>
        <a href="#">You've studied nothing.</a>
      </li>
    {% endif %}

    {% if data.courses.length > 0 %}
      {% for entry in data.courses %}
        <li class="no-padding">
					<ul class="collapsible collapsible-accordion">
						<li class="bold">
            <a class="collapsible-header tooltipped waves-effect waves-cyan" data-position="right" data-tooltip="{{ entry.course.shortdesc }}">
              {{ entry.course.title }}
            </a>
							<div class="collapsible-body">
								<ul>
                  {% for round in entry.rounds %}
									  <li><a style="color: black;" lessonId="{{ round.roundid }}">{{ round.name }}</a></li>
                  {% endfor %}
								</ul>
							</div>
						</li>
					</ul>
				</li>
      {% endfor %}
    {% endif %}
    </ul>
  </div>
</li>
</ul>
</li>

<!-- History -->
<li class="bold">
<a href="/" class="waves-effect waves-cyan">
<i class="mdi-action-history"></i>
Game History
</li>
