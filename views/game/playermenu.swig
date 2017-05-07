<!-- The user data / details row -->
<li class="user-details cyan darken-2">
<div class="row">
  <!-- profile picture -->
  <div class="col col s4 m4 l4">
    <img src="{{ data.user.PHOTOURL }}" alt="{{ data.user.PLAYERNAME }}" class="circle responsive-img valign profile-image" data-pin-nopin="true" style="min-height: 50px;">
  </div>

  <div class="col col s8 m8 l8">
    <!-- Name with dropdown-menu -->
    <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn profile-btn-wrapped" href="#" data-activates="profile-dropdown">
      <i class="material-icons">toc</i>
      {{ data.user.PLAYERNAME }}
    </a>

    <!-- Drop down menu with links to profile -->
    <ul id="profile-dropdown" class="dropdown-content" style="width: 128px; position: absolute; top: 57px; left: 101.234px; opacity: 1; display: none;">
       <li>
        <a href="#" class="loadProfileButton" profileid="{{ data.user.PLAYERID }}">
          <i class="large material-icons">settings</i>Profile
        </a>
      </li>
      <li>
        <a href="#">
          <i class="material-icons">credit_card</i>
          Donate
        </a>
      </li>
      <li class="divider"></li>
      <li>
        <a href="/logout">
          <i class="material-icons">settings_power</i>Log out</a>
      </li>
    </li>
  </ul>

  <!-- User level -->
  <p class="user-level" style="margin-top: 16px !important;line-height: 20%;">
    <b>Level {{ data.user.PLAYERLEVEL }}</b>
    <span class="right">
      {{ data.user.EXPERIENCE }} /
      <b>{{ data.user.nextlvl }}</b>
    </span>
  </p>

  <!-- PLAYER COOKIES -->
  <p id="toAppendCookies" class="user-level" style="margin-top: 0px !important; line-height: 150%; margin-right: 2px;">

  </p>

  <!-- PLAYER AVAILABLE SKILLPOINTS -->
  <p id="toAppendSkillPoints" class="user-level" style="margin-top: 0px !important; line-height: 150%;">

  </p>

</div>
</div>
</li>

<!-- Information about user here -->

<span id="skillsOnSmallScreens" class="hide-on-large-only show-on-medium-and-down">
</span>

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
          <a class="loadProfileButton" profileid="{{ friend.PLAYERID }}" href="#">{{ friend.PLAYERNAME }}</a>
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
            <a class="collapsible-header waves-effect waves-cyan">
              {{ entry.course.title }}
            </a>
							<div class="collapsible-body">
								<ul>
                  {% for round in entry.rounds %}
									  <li><a lessonId="{{ round.roundid }}" class="lessonLoader" style="color: black; cursor: pointer;">{{ round.name }}</a></li>
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

<!-- START ITEMS INVENTORY TRIGGER-->
<li>
       <!-- Modal Trigger -->
      <a id="loadInventoryButton" class="modal-trigger waves-effect waves-cyan white" href="#inventoryContent"><i class="material-icons">work</i>My Items</a>
      
</li>
<!-- END ITEMS INVENTORY TRIGGER -->

<!-- START TOP PLAYERS BY TRIGGERS -->
<li>
    <li class="no-padding">
    <ul class="collapsible collapsible-accordion">
        <li class="bold"><a class="collapsible-header waves-effect waves-cyan"><i class="medium material-icons">start_rate</i>Top Players</a>
            <div class="collapsible-body">
                <ul>
                <li>
                     <a class="modal-trigger waves-effect waves-cyan white loadTopPlayersButton" href="#topPlayersContent"  by="WINS"></i>By Wins</a>
                </li>
                <li>
                     <a class="modal-trigger waves-effect waves-cyan white loadTopPlayersButton" href="#topPlayersContent" by="PLAYERLEVEL"></i>By Level</a>
                </li>
                <li>
                     <a class="modal-trigger waves-effect waves-cyan white loadTopPlayersButton" href="#topPlayersContent"  by="EXPERIENCE"></i>By Experience</a>
                </li>
                </ul>
            </div>
        </li>
    </ul>
</li>
</li>
<!-- END TOP PLAYERS BY TRIGGERS -->

