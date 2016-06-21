
<div style="margin: 15px;">




<div id="clock">
<div class="clock" style="width: 300px; margin: auto;"></div>

</div>

  <div id="arenaContainer" class="row">

  <ul id="onlinePlayers" class="collection with-header col s12 m6 offset-m3 center-align" style="padding-left: 0px;">
    <li class="collection-header cyan white-text">
        <h6 class="task-card-title">Players in arena</h6>
    </li>
  </ul>


    <div id="Questions" class="col s12 m8"></div>

    <div id="Top">
    </div>

    <div id="Winners" >
    </div>
  </div>




  <script type="text/javascript" src="/js/dependencies/sails.io.js"></script>
  <script type="text/javascript" src="js/multiplayer/arena.js"></script>



 <!-- Floating button for entering the arena -->
 <div class="fixed-action-btn" style="bottom: 170px; right: 24px;">
    <a id="submitAnswer" class="btn-floating btn-large green tooltipped" data-position="top" data-tooltip="Submit answer">
      <i class="mdi-content-send"></i>
    </a>
</div>

<!-- Floating button for entering the arena -->
<div class="fixed-action-btn" style="bottom: 110px; right: 24px;">
   <a id="challangeBtn" class="btn-floating btn-large cyan darken-2 tooltipped" data-position="top" data-tooltip="Challenge selected">
     <i class="large mdi-av-play-arrow"></i>
   </a>
</div>
</div>
