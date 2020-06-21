var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
var userClickedPattern = [];
var score=0;

$(".btn").click(function(event) {
  event.stopPropagation();
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  check(userClickedPattern.length - 1);
});


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level - " + level);
    setTimeout(function(){
      nextSequence();
    },1000);
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    $("#level-title").text("Level - " + level);
    setTimeout(function(){
      nextSequence();
    },1000);

    started = true;
  }
});



function check(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
       score++;
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over. Your score = " +score);
    setTimeout(function(){
      $("#level-title").text("Press any key or touch to start");
    },6000);
    score=0;
    startOver();
  }

}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").html("Level - " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var i=0;
  flash(gamePattern[i])
  function flash(color){
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
    setTimeout(function(){
      i++;
      if(i<gamePattern.length){
      flash(gamePattern[i]);}
    },500);

  }
}


$(".play").click(function(event){
  event.stopPropagation();
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}
