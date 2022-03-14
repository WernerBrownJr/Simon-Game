

const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = true;
var level = 0;

//Checks what color button was clicked and stores it in a variable//
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  checkAnswer(userClickPattern.length-1);
  playSound(userChosenColor);
  animatePress(userChosenColor)
});

//Checks that they keyboard was used to start the game
  $(document).keydown(function(/*key*/){
    if (started === true) { //Next sequence is only called on the started button press
      nextSequence();
      $("#level-title").text("level " + level);
      started = false;
    }
    //console.log(key.key);
  });

//function for determining the next sequence
function nextSequence() {
  //resets userClickPattern so that the user can click the whole sequence.
  userClickPattern = [];
  //get a random color and add it to the game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //increase level on h1
    level += 1;
    $("#level-title").text("level " + level);

  //visual and audio effects
  playSound(randomChosenColor);
  animatePress(randomChosenColor)
}

//checks the answer that the user put in
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    // console.log(userClickPattern);
    // console.log(gamePattern);
  }else{
    console.log("wrong");
    // console.log(userClickPattern);
    // console.log(gamePattern);

    //animate body and play sound when user is wrong.
    playSound("wrong");
    $("#level-title").text("GAME-OVER, Press Any Key to Restart" + "  your score : " + level);
    $("body").addClass("game-over");
    //timer to remove game-over class (css style)
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }

  //if user is finished with the whole pattern the next item for the game pattern is called
  if (userClickPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

//starts the game over when called. (called when user is wrong)
function startOver() {
  started = true;
  level = 0;
  gamePattern = [];
}

//plays a sound depending on what button is clicked or chosen for the next sequence
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
  //console.log(sound);
}

//animates the button if its pressed
function animatePress(name) {
  $("#" + name).addClass("pressed");
  $("#" + name).fadeToggle(150).fadeToggle(150);

  setTimeout(function() {
    $("#" + name).removeClass("pressed");
  }, 100);
}
