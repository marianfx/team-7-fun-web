{% for entry in data.courses %}
<!-- Course card-->
<div class="col s12 m3 l4">
  <div class="course-card">
    <div class="card" style="margin-top: 10px; padding-bottom: 20px; margin-bottom: 20px;">
      <!-- Card image -->
      <div class="card-image waves-effect waves-block waves-light">
        <img src="{{ entry.course.photoUrl }}" alt="blog-img">
      </div>
      <!-- The special info button -->
      <ul class="card-action-buttons">
        <li>
          <a class="btn-floating tooltipped waves-effect waves-light light-blue" data-position="top" data-tooltip="See info">
            <i class="mdi-action-info activator"></i>
          </a>
        </li>
      </ul>
      <!-- Card info text -->
      <div class="card-content">
        <!-- Master course title and date added -->
        <p class="row">
          <span class="left">
            <b>{{ entry.course.hashtag }}</b>
          </span>
          <span class="right">
            {{ entry.course.creationDate }}</span>
        </p>
        <!-- All the rouds -->
        <div class="row center-align" style="padding-left: 50px;">

{% for round in entry.rounds %}
      <!-- Finished course -->
      {% if round.roundid < data.me.lastRoundId %}
          <div class="fixed-action-btn" style="position: relative; display: inline-block; bottom: 0px;">
            <a class="btn-floating green unlocked">
              <i class="mdi-action-done"></i>
            </a>
            <ul class="center-align" style="bottom: 70%; margin-left: -1px;">
              <li>
                <a lessonId="{{ round.roundid }}" class="btn-floating tooltipped lessonLoader" data-position="right" data-tooltip="Read lesson">
                  <i class="material-icons green">attach_file</i>
                </a>
              </li>
            </ul>
          </div>
      {% endif %}
      <!-- Current course -->
      {% if round.roundid === data.me.lastRoundId %}
          <div class="fixed-action-btn" style="position: relative; display: inline-block; bottom: 0px;">
            <a class="btn-floating red darken-2 animated unlocked">
              <i class="mdi-av-play-arrow"></i>
            </a>
            <ul class="center-align" style="bottom: 70%; margin-left: -1px;">
              <li>
                <a lessonId="{{ round.roundid }}" class="btn-floating tooltipped lessonLoader" data-position="right" data-tooltip="Read lesson">
                  <i class="material-icons cyan darken-1">attach_file</i>
                </a>
              </li>
              <li>
                <a lessonId="{{ round.roundid }}" class="btn-floating tooltipped playable" data-position="right" data-tooltip="Test time!">
                  <i class="material-icons red darken-1">query_builder</i>
                </a>
              </li>
            </ul>
          </div>
      {% endif %}
      <!-- Future locked course -->
      {% if round.roundid > data.me.lastRoundId %}
          <div class="fixed-action-btn locked" style="position: relative; display: inline-block; bottom: 0px;">
            <a class="btn-floating tooltipped grey darken-1" data-position="top" data-tooltip="Locked">
              <i class="mdi-action-lock"></i>
            </a>
          </div>
      {% endif %}
  {% endfor %}
        </div>
        <!-- Course title and author -->
        <div class="row col s12">
          <h4 class="card-title grey-text text-darken-4">
            {{ entry.course.title }}
          </h4>
        </div>
        <div class="row col s12">
          By
          <a href="#">{{ entry.course.author }}</a>
        </div>
      </div>
      <!-- Course short description -->
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">
          <i class="mdi-navigation-close right"></i>
          {{ entry.course.title }}
        </span>
        <p>
          {{ entry.course.shortdesc }}
        </p>
      </div>
    </div>
  </div>
</div>
{% endfor %}
