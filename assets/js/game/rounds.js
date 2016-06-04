var answers = {};

$(document).ready(function() {
    //
    var clock = $('.clock').FlipClock(20, {
  		clockFace: 'MinuteCounter',
      countdown: true,
      autoStart: true,
      defaultLanguage:'ro',
      callbacks: {
		        	stop: function() {
		        		alert('The clock has stopped!');
		        	}
            }
  	});

    $("#range").ionRangeSlider({
           hide_min_max: true,
           keyboard: true,
           min: 0,
           max: 5000,
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

    $("#submmitBtn").click( function(){
        console.log(answers);
        console.log("am apasat subbmit");
        submmitAnswer();
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

function submmitAnswer(){

  $.ajax({
    type: "POST",
    url: "/questions/submmit",
    data: answers,
    contentType: "application/x-www-form-urlencoded;charset=utf-16",

    success: function(result){
      console.log(result);
    },

    error: function(result){

    },
  timeout: 5000
});


}
