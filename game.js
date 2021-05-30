var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Starting the game
$("h1").click(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function(){
      nextSequence();
    },1000);
    started = true;
  };
});


// Next sequence
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


// Check the answer
function checkAnswer(currentLevel) {
  // If answer is right, then wait for the next button click. If sequence is fully correct then give the next step after 1 second
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      },1000);
    };
  } else {
//     // If answer is wrong
    $("#level-title").text("Game Over at Level "+ level +", Press Here To Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  };
};


function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
};


// Button pressed
$(".btn").click(function() {
  if (started) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  };
});

function startOver() {
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
};
