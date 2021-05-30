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
    },800);
    started = true;
    pointerSelect();
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
  pointerSelect();
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
    pointerSelect();
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
  pointerSelect();
};

// If user misses which colour is next
$("#remind").click( function() {
  if (userClickedPattern.length === 0) {
    $("#"+gamePattern[level-1]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[level-1]);
  };
});

function pointerSelect() {
  if (started) {
    $("h1").removeClass("cursor-pointer");
    $("h1").addClass("cursor-default");
    $(".btn").addClass("cursor-pointer");
    if (userClickedPattern.length === 0) {
      $("#remind").addClass("cursor-pointer");
      $("#remind").removeClass("cursor-default");
    } else {
      $("#remind").removeClass("cursor-pointer");
      $("#remind").addClass("cursor-default");
    }
  } else {
    $(".btn").removeClass("cursor-pointer");
    $("h1").addClass("cursor-pointer");
    $("h1").removeClass("cursor-default");
    $("#remind").removeClass("cursor-pointer");
    $("#remind").addClass("cursor-default");
  };
};
