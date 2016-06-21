{% extends '../mainlayout.swig' %}

{% block title %}Create Question
  {% parent %}{% endblock %}

{% block head %}
  {% parent %}
  <link type="text/css" rel="stylesheet" href="./styles/admin/course.css">
{% endblock %}

{% block content %}
  <div id="register-page" class="row center-align">
    <div class="col s12 s8 offset-s2 z-depth-4 card-panel">
      <form id="registerForm" class="courses-form">

        <div class="row">
          <div class="input-field col s12 center">
            <h4>New Question</h4>
            <p class="center">So, you want to add new Question to existent Round</p>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">

            <select name="roundST" id="roundST" class="required">
              <option value="" disabled selected>Choose your option</option>
{% for round in rounds %}
              <option value="{{round.roundid}}">{{round.name}}</option>
{% endfor %}
            </select>
            <label class="center-align">Chose Round</label>
          </div>
          <div class="errorTxt1 righted"></div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">forum</i>
            <label class="center-align" for="questionTB">QUESTION</label>
            <input id="questionTB" name="questionTB" type="text" data-error=".errorTxt2">
            <div class="errorTxt2 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label class="center-align" for="answerATB">answerA</label>
            <input id="answerATB" name="answerATB" value="A. " type="text"  data-error=".errorTxt3">
            <div class="errorTxt3 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label class="center-align" for="answerBTB">ANSWERB</label>
            <input id="answerBTB" name="answerBTB"  value="B. " type="text"  data-error=".errorTxt4">
            <div class="errorTxt4 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label class="center-align" for="answerCTB">ANSWERC</label>
            <input id="answerCTB" name="answerCTB" value="C. " type="text"  data-error=".errorTxt5">
            <div class="errorTxt5 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label class="center-align" for="answerDTB">ANSWERD</label>
            <input id="answerDTB" name="answerDTB" value="D. " type="text"  data-error=".errorTxt6">
            <div class="errorTxt6 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">done_all</i>
            <label class="center-align" for="correctAnsTB">CORRECTANSWER</label>
            <input id="correctAnsTB" name="correctAnsTB" type="number" min="1" step="1" max="4" data-error=".errorTxt7">
            <div class="errorTxt7 righted"></div>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <a id="submitBtn" class="btn waves-effect waves-light red col s12">Add Question</a>
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
  <script type="text/javascript" src="./js/admin/newQuestion.js"></script>
{% endblock %}
