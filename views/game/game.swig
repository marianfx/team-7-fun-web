
{% extends '../mainlayout.swig' %}

{% block title %} Play Fun Web  {% parent %}{% endblock %}

{% block head %}
	{% parent %}
	<link type="text/css" rel="stylesheet" href="./styles/game/game.css">
	<link type="text/css" rel="stylesheet" href="./styles/game/game.style.css">
{% endblock %}

{% block content %}


	<!-- START HEADER NAV -->
     <header id="header" class="page-topbar">
         <div class="navbar-fixed">
             <nav class="navbar-color">
                 <div class="nav-wrapper">
                     <!-- other stuff here. All aligned right. -->
                     <ul class="right">
                         <!-- fullscreen mode -->
                         <li>
                             <a href="javascript:void(0);" class="waves-effect waves-block waves-light toggle-fullscreen"><i class="mdi-action-settings-overscan"></i></a>
                         </li>
                     </ul>
                 </div>
             </nav>
         </div>
     </header>
     <!-- End header nav-->



     <!-- START MAIN -->
     <div id="main">
         <!-- START WRAPPER -->
         <div class="wrapper">

             <!-- START LEFT SIDEBAR NAV-->
             <aside id="left-sidebar-nav">


                 <ul id="slide-out" class="side-nav fixed leftside-navigation">
								 		<!-- The user data atached here -->
                 </ul>

           <!-- Button displayed only on small screens (phones) -->
           <a href="#" data-activates="slide-out" class="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only cyan"><i class="material-icons">toc</i></a>
             </aside>
             <!-- END LEFT SIDEBAR NAV-->



             <!-- START CONTENT -->
             <section id="content">
                 <!--START CONTAINER-->
                 <div class="container" id="contentContainer">

                     <!--CARD WIDGETS START-->
                     <div id="card-widgets">
                         <div class="row" id="coursesContainer">
												 			<!-- courses appended here -->
                         </div>
                     </div>
                 </div>
                 <!--END CONTAINER-->
             </section>
             <!-- END CONTENT SECTION -->
         </div>
         <!-- END WRAPPER -->

     </div>
     <!-- END MAIN -->


{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
	<script type="text/javascript" src="./js/game/plugins.preparer.js"></script>
	<script src="./js/game/flipclock.js"></script>
	<script src="./js/game/rounds.js"></script>
	<script type="text/javascript" src="./js/game/loader.js"></script>
{% endblock %}
