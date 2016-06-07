var answers = {};
var time;

$(document).ready(function() {


  var clock = $('.clock').FlipClock(20, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: true,
    defaultLanguage: 'ro',
    callbacks: {
      stop: function() {
        //alert('The clock has stopped!');
      }
    }
  });

  $("#range").ionRangeSlider({
    hide_min_max: true,
    keyboard: true,
    min: 0,
    max: 50000,
    from: 1000,
    to: 4000,
    type: 'double',
    step: 1,
    prefix: "$",
    grid: true
  });


  $(".qq").click(function() {
    doSelect(this);
  });

  $("#submmitBtn").click(function() {
    console.log(answers);
    console.log("am apasat subbmit");
    submmitAnswer();
    swal({
      title: "Waiting for checking your answers",
      text: "",
      imageUrl: "./images/waiting.gif",
      imageSize: '180x180',
      showConfirmButton: false,
      showCancelButton: false,
      showLoaderOnConfirm: true,
    });
  });

  $("#homeBtn").click(function(){
    ///Fx's function for going home
    console.log("FX");
  });
});

function doSelect(me) {
  var parent = $(me).parent().attr("id");
  $(me).parent().children(".qq").removeClass("active");



  var classList = $(me).attr('class').split(" ");
  var index = classList.length - 1;
  var value = classList[index];

  $(me).addClass("active");

  answers[parent] = value;


  console.log(answers);

}

function submmitAnswer() {

  $.ajax({
    type: "POST",
    url: "/questions/submmit",
    data: answers,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result) {
      setTimeout(swal.close, 1500);
      setTimeout(function() {
        processResponse(result);
      }, 3000);
    },

    error: function(result) {
      setTimeout(swal.close, 1500);
      setTimeout(function() {
        swal("you fail this city", "Bad Request", "error");
      },2000);
    },
    timeout: 5000
  });


}

function processResponse(result) {

  if (!result.flagTime) {
    console.log("you're missing the bus sorry");
    swal({
      title: "You're the best!",
      text: "You passed that exam...",
      type: "error"
    });
  } else {
    if (result.flagnextRound)
      console.log("you're the best");

    swal({
      title: "You're the best!",
      text: "You passed that exam...",
      type: "success",
      timer: 2000,
      showConfirmButton: false
    });

    var ans = result.correctAnswers;
    for (var x in ans) {
      console.log(x);
      console.log(ans[x]);
      var byID="#"+x;
      var byClass=ans[x].correctNr;
      //$(byID).addClass(green);
      var elem = $('#' + x).children('.' + byClass)[0];
      console.log(elem);
      $(elem).addClass('green');


    }
    var home= $('<a id="homeBtn" class="waves-effect waves-light  btn">home</a>');
       $(".Questions").append(home);

  }

}
