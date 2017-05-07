{% extends '../mainlayout.swig' %}

{% block title %}Create Course
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
            <h4>New Course</h4>
            <p class="center">So, you want to  add new Course</p>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">assignment</i>
            <label for="courseTB">TITLE</label>
            <input id="courseTB" name="courseTB" class="course" type="text" data-error=".errorTxt1">
            <div class="errorTxt1 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">forum</i>
            <label for="descTB">SHORTDESC</label>
            <input id="descTB" name="descTB" type="text" data-error=".errorTxt2">
            <div class="errorTxt2 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">code</i>
            <label for="hashTB">HASHTAG</label>
            <input id="hashTB" name="hashTB" type="text" data-error=".errorTxt3">
            <div class="errorTxt3 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">picture_in_picture</i>
            <label for="photoTB">PHOTOURL</label>
            <input id="photoTB" name="photoTB" type="text" data-error=".errorTxt4">
            <div class="errorTxt4 righted"></div>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">perm_identity</i>
            <label for="authorTB">AUTHOR</label>
            <input id="authorTB" name="authorTB"  type="text" data-error=".errorTxt4">
            <div class="errorTxt4 righted"></div>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <a id="submitBtn" class="btn waves-effect waves-light red col s12">Add Course</a>
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
    <script type="text/javascript" src="/js/admin/newCourse.js"></script>
{% endblock %}
