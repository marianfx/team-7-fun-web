
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

                     <!-- The user data / details row -->
                     <li class="user-details cyan darken-2">
                         <div class="row">
                             <!-- profile picture -->
                             <div class="col col s4 m4 l4">
                                 <img src="/images/avatars/mfx.jpg" alt="" class="circle responsive-img valign profile-image" data-pin-nopin="true">
                             </div>

                             <div class="col col s8 m8 l8">

                                 <!-- Name with dropdown-menu -->
                                 <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown">
                     Marian FX
                     <i class="material-icons">toc</i>
                   </a>

                     <!-- Drop down menu with links to profile -->
                     <ul id="profile-dropdown" class="dropdown-content" style="width: 128px; position: absolute; top: 57px; left: 101.234px; opacity: 1; display: none;">
                         <li>
                             <a href="#">
														 		<i class="large material-icons">settings</i>
														 		Profile
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
														 		<i class="material-icons">settings_power</i>
																Log out
															</a>
                         </li>
                       </li>
                     </ul>

                     <!-- User level -->
                     <p class="user-level"><b>Level 7</b> <span class="right"> 150 / <b>500</b> </span></p>
                     </div>
                     </div>
                     </li>

                     <!-- Information about user here -->

                     <!-- Friends -->
                     <li class="no-padding">
                         <ul class="collapsible collapsible-accordion">
                             <li class="bold"><a class="collapsible-header waves-effect waves-cyan"><i class="mdi-social-people"></i> Friends</a>
                                 <div class="collapsible-body">
                                     <ul>
                                         <li><a href="#">You're solo here.</a></li>
                                     </ul>
                                 </div>
                             </li>
                         </ul>
                     </li>

                     <li class="no-padding">
                         <ul class="collapsible collapsible-accordion">
                             <li class="bold"><a class="collapsible-header waves-effect waves-cyan"><i class="mdi-communication-live-help"></i> Courses</a>
                                 <div class="collapsible-body">
                                     <ul>
                                         <li><a href="#">Curs CSS</a></li>
                                         <li><a href="#">Curs AJAX</a></li>
                                     </ul>
                                 </div>
                             </li>
                         </ul>
                     </li>

                     <li class="bold"><a href="/" class="waves-effect waves-cyan"><i class="mdi-action-history"></i> Game History
                     </li>
                   </ul>

           <!-- Button displayed only on small screens (phones) -->
           <a href="#" data-activates="slide-out" class="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only cyan"><i class="material-icons">toc</i></a>
             </aside>
             <!-- END LEFT SIDEBAR NAV-->



             <!-- START CONTENT -->
             <section id="content">


                 <!--START CONTAINER-->
                 <div class="container">

                     <!--CARD WIDGETS START-->
                     <div id="card-widgets">
                         <div class="row" id="cardsContainer">

                         </div>
 					<!--CARD WIDGETS END-->
                     </div>


                     <div class="modal bottom-sheet"
                     style="display: inline-block; opacity: 1; bottom: 0px;">

                       <div class="modal-content">

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
{% endblock %}
