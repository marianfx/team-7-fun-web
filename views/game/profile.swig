
<link type="text/css" rel="stylesheet" href="./styles/game/dropify.css">

<!-- START PROFILE HEADER : photo, username, level, experience, cookies, add friend button -->
<div id="profile-page" class="section">
  <!-- profile-page-header -->
  <div id="profile-page-header" class="card">

    <div class="card-image waves-effect waves-block waves-light" style="overflow: hidden;background: url('images/cover.jpg');background-size: cover;background-position: center;"></div>

    <div class="card-content">
      <figure class="card-profile-image">
        <img src="{{ userdata.details.PHOTOURL }}" alt="{{ userdata.details.PLAYERNAME }}'s profile photo." class="circle z-depth-2 responsive-img  waves-block waves-light" style="min-height: 100px;">
      </figure>

      <div class="row">
        <div class="col s5" style="margin-left: 130px;">
          <h4 class="card-title grey-text text-darken-4">{{ userdata.details.PLAYERNAME }}</h4>
          <p class="medium-small grey-text">Level
            {{ userdata.details.PLAYERLEVEL }}</p>
        </div>

        <div class="col s2 hide-on-small-only center-align">
          <h4 class="card-title grey-text text-darken-4">{{ userdata.details.EXPERIENCE }}</h4>
          <p class="medium-small grey-text">Experience</p>
        </div>

        <div class="col s2 hide-on-small-only center-align">
          <h4 class="card-title grey-text text-darken-4">{{ userdata.details.COOKIES }}</h4>
          <p class="medium-small grey-text">Cookies</p>
        </div>

        {% if !userdata.me %}
        <div class="col s1 right">
          <a class="btn-floating tooltiped waves-effect waves-light darken-2 right" id="addFriendButton" playerid="{{ userdata.details.PLAYERID }}" data-position="top" data-tooltip="Add friend.">
            <i class="mdi-action-perm-identity"></i>
          </a>
        </div>
        {% endif %}
      </div>
    </div>
  </div>
  <!-- END PROFILE HEADER -->

  <!-- START PROFILE CONTENT -->
  <div id="profile-page-content" class="row">

    <!-- profile-page-sidebar-->
    <div id="profile-page-sidebar" class="col s12">

      <!-- START PROFILE GAMES / WINS / LOSES  -->
      <div class="card white col s12">
        <div class="row center-align">

          <div class="card-content white-text center-align col s4" style="display: inline-block;">
            <p class="card-title amber-text">
              <i class="mdi-av-play-circle-fill amber-text"></i>
              <strong>{{ userdata.details.WINS + userdata.details.LOSES }}</strong>
            </p>
            <p class="grey-text">Games</p>
          </div>

          <div class="card-content white-text center-align col s4" style="display: inline-block;">
            <p class="card-title green-text">
              <i class="mdi-action-thumb-up green-text"></i>
              <strong>{{ userdata.details.WINS }}</strong>
            </p>
            <p class="grey-text">Wins</p>
          </div>

          <div class="card-content white-text center-align col s4" style="display: inline-block;">
            <p class="card-title red-text">
              <i class="mdi-action-thumb-down red-text"></i>
              <strong>{{ userdata.details.LOSES }}</strong>
            </p>
            <p class="grey-text">Losses</p>
          </div>

        </div>
      </div>
      <!-- END PROFILE GAMES / WINS / LOSES -->

      {% if userdata.me %}
      <style>
        form p {
            text-align: center !important;
        }
      </style>
      <!-- PROFILE UPDATE -->
      <ul class="collection z-depth-1">
        <li class="collection-item">
          <div class="row  center-align">
            <div class="grey-text darken-1">
              <i class="mdi-editor-border-color"></i>
              Edit your info</div>
          </div>
        </li>
        <li class="collection-item">
          <form id="updateForm" class="col s12" action="player/update" enctype="multipart/form-data" method="post">
            <div class="row">
              <div class="input-field col s12">
                <input id="last_name" name="playerName" type="text" class="validate" value="{{ data.playername }}">
                <label for="last_name">Player Name</label>
              </div>
            </div>
            <div class="row col s12">
              <div class="col s12">
                <p>Upload your profile picture. Max size: 2MB</p>
                <input type="file" id="input-file-max-fs" name="avatar" multiple="multiple" class="dropify" data-max-file-size="2M"/>
              </div>
            </div>
            <div class="row right" style="margin-bottom: 10px; margin-right: 10px;">
              <div class="input-field col s12">
                <input class="waves-effect waves-light btn cyan darken-2" type="submit" value="Update">
              </div>
            </div>
          </form>
        </li>
      </ul>
      <!-- END profile update -->
      {% endif %}

      <!-- START PROFILE ABOUT - OTHER INFORMATION  -->
      <div class="col s12 m12">

        <ul id="profile-page-about-details" class="collection z-depth-1">

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-social-person-outline"></i>
                Username</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.USERNAME }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-social-person"></i>
                Name</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.PLAYERNAME }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-file-cloud-done"></i>
                Registered on</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.REGISTRATIONDATE }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-file-cloud-done"></i>
                Daily logins</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.DAILYLOGINS }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-file-cloud-done"></i>
                Last login on</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.LASTLOGINDATE }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-hardware-mouse"></i>
                Experience</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.EXPERIENCE }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s6 grey-text darken-1">
                <i class="mdi-editor-insert-chart"></i>
                Level</div>
              <div class="col s6 grey-text text-darken-4 right-align">{{ userdata.details.PLAYERLEVEL }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-action-account-balance"></i>
                Cookies</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.details.COOKIES }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-av-play-circle-fill"></i>
                Games</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.details.WINS + userdata.details.LOSES }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-action-thumb-up"></i>
                Wins</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.details.WINS }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-action-thumb-down"></i>
                Loses</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.details.LOSES }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-toggle-check-box"></i>
                Perfect games</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.details.PERFECTROUNDS }}</div>
            </div>
          </li>

          <li class="collection-item">
            <div class="row">
              <div class="col s5 grey-text darken-1">
                <i class="mdi-social-cake"></i>
                Friends</div>
              <div class="col s7 grey-text text-darken-4 right-align">{{ userdata.friendscount }}</div>
            </div>
          </li>

        </ul>
        <!-- END PROFILE ABOUT -->
      </div>
    </div>
  </div>


	<script src="./js/game/dropify.js"></script>
