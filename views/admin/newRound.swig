{% extends '../mainlayout.swig' %}

{% block title %}Create Round
  {% parent %}{% endblock %}

{% block head %}
  {% parent %}
  <link type="text/css" rel="stylesheet" href="/styles/admin/course.css">
{% endblock %}

{% block content %}
  <div id="register-page" class="row center-align">
    <div class="col s12 s8 offset-s2 z-depth-4 card-panel">
      <form id="registerForm" class="courses-form">

        <div class="row">
          <div class="input-field col s12 center">
            <h4>New Round</h4>
            <p class="center">So, you want to add a new Round to an existent Course?</p>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">

            <select name="courseST" id="courseST" class="required">
              <option value="" disabled selected>Choose your option</option>
{% for course in courses %}
              <option value="{{course.courseId}}">{{course.title}}</option>
{% endfor %}
            </select>
            <label class="center-align" for="courseST">Choose Course</label>
          </div>
          <div class="errorTxt1 righted"></div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">forum</i>
            <label for="nameTB">NAME</label>
            <input id="nameTB" name="nameTB" type="text" data-error=".errorTxt2">
            <div class="errorTxt2 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label for="nrQTB">NR OF QUESTIONS</label>
            <input id="nrQTB" name="nrQTB" type="number" min="1" step="1" data-error=".errorTxt3">
            <div class="errorTxt3 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">mode_edit</i>
            <label for="courseCTB">COURSE HTML</label>
            <textarea id="courseCTB" name="courseCTB" data-error=".errorTxt4" class="materialize-textarea" style="height: 22px;"></textarea>
            <div class="errorTxt4 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">av_timer</i>
            <label for="timeTB">ROUNDTIME</label>
            <input id="timeTB" name="timeTB" type="number" min="100" step="50" data-error=".errorTxt5">
            <div class="errorTxt5 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">stars</i>
            <label for="pointsTB" >POINTS</label>
            <input id="pointsTB" name="pointsTB" type="number" min="100" step="5" data-error=".errorTxt6">
            <div class="errorTxt6 righted"></div>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <a id="submitBtn" class="btn waves-effect waves-light red col s12">Add Round</a>
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
  <script type="text/javascript" src="/js/admin/newRound.js"></script>
{% endblock %}
