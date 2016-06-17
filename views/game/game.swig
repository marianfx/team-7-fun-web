
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

                        <span id="toAppendSkills">

                        </span>

                        <!-- START SHOP TRIGGER -->
                        <li>
                            <a id="openShopButton" class="modal-trigger waves-effect waves-cyan" href="#shopContent"><i class="material-icons">shopping_cart</i></a>
                        </li>
                        <!-- END SHOP TRIGGER -->

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

                    <!-- START LUCK MODAL CONTENT -->
                    <div id="luckContent" class="modal modal-fixed-footer modalsize">
                        <div class="modal-content">
                            <h4 class="cyan-text text-darken-2">Test Your Luck</h4>
                              
                            <div class="valign-wrapper" id="diceTower" style="height: 70%; font: normal 400 18px/1 'Calibri', sans-serif; box-sizing: border-box;">

                            </div>

                        </div>

                        <div class="modal-footer">
                          
                          <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat" id="exitLuckButton">Exit</a>
                          <a href="#!" class="waves-effect waves-cyan btn-flat" id="rollDicesButton">Roll</a>
                        </div>
                    </div>
                    <!-- END LUCK MODAL CONTENT -->

                    <!-- START TOP PLAYERS CONTENT -->
                    <div id="topPlayersContent" class="modal modal-fixed-footer modalsize">

                        <div class="modal-content" id="toAppendTopPlayers">
                        
                        </div>

                        <div class="modal-footer">
                          <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat ">Exit</a>
                        </div>
                    </div>
                    <!-- END TOP PLAYERS CONTENT -->

                    <!-- START ITEM INVENTORY CONTENT -->
                    <div id="inventoryContent" class="modal modal-fixed-footer modalsize">

                        <div class="modal-content">
                            <div class="row" id="toAppendInventory">

                            </div>
                        </div>

                        <div class="modal-footer">
                            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat ">Exit</a>
                        </div>
                    </div>
                    <!-- END ITEM INVENTORY CONTENT --> 

                    <!-- START ITEM SHOP-->
                    <div id="shopContent" class="modal modal-fixed-footer modalsize">

                            <input type="hidden" id="lastItemID" value="0">
                            <input type="hidden" id="limit" value="2">

                            <div class="modal-content">
                                <div class="row" id="toAppendShop">

                                </div>
                            </div>

                            <div class="modal-footer">
                                
                              <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat" id="exitShopButton">Exit</a>

                              <a href="#!" class="waves-effect waves-cyan btn-flat" id="loadShopButton">Load</a> 
                            </div>
                    </div>
                    <!-- END ITEM SHOP -->    


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

		 <div class="container" id="modalContainer">

		 </div>
{% endblock %}

{% block footer %}
	{% parent %}
	<!--Import script for this page-->
	<script type="text/javascript" src="./js/game/plugins.preparer.js"></script>
	<script src="./js/game/flipclock.js"></script>
	<script src="./js/game/rounds.js"></script>
	<script type="text/javascript" src="./js/game/loader.js"></script>
{% endblock %}
