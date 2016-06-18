
<div style="margin: 15px;">

  <div id="arenaContainer">

    <ul id="onlinePlayers" class="collection with-header" style="padding-left: 0px;">
      <li class="collection-header cyan white-text">
          <h6 class="task-card-title">Players in the Arena</h6>
      </li>
    </ul>

    <div id="Winners" class="col s8 left">
    </div>

    <div id="Questions" class="col s8 left"></div>

    <div id="Top" class="col s4 right">
    </div>
  </div>

  <script type="text/javascript" src="/js/dependencies/sails.io.js"></script>
  <script type="text/javascript" src="js/multiplayer/arena.js"></script>

  <!-- Floating button for entering the arena -->
  <div class="fixed-action-btn" style="bottom: 110px; right: 24px;">
     <a id="challangeBtn" class="btn-floating btn-large cyan darken-2 tooltipped" data-position="top" data-tooltip="Challenge selected">
       <i class="large mdi-av-play-arrow"></i>
     </a>
 </div>

 <!-- Floating button for entering the arena -->
 <div class="fixed-action-btn" style="bottom: 170px; right: 24px;">
    <a id="submitAnswer" class="btn-floating btn-large green tooltipped" data-position="top" data-tooltip="Submit answer">
      <i class="mdi-content-send"></i>
    </a>
</div>
</div>
