// Selectors
var taxi = $("#taxi");
var container = $("#container");
var speed = 2;
var roadPosition = null;
var steps = 7; // in px

// Declaring the height and the weight of the taxi and container
var taxiWidth = parseInt(taxi.width());
var taxiHeight = parseInt(taxi.height());
var containerWidth = parseInt(container.width());
var containerHeight = parseInt(container.height());

// Request animation variables declaration
var moveUpAnimation = false;
var moveDownAnimation = false;
var moveLeftAnimation = false;
var moveRightAnimation = false;

// Taxi movement declaration
var myTaxi = {
  name: "Crazy Taxi",
  moveUp: function() {
    if (parseInt(taxi.css("top")) > 0) {
      taxi.css("top", parseInt(taxi.css("top")) - steps);
      moveUpAnimation = requestAnimationFrame(myTaxi.moveUp);
    }
  },
  moveDown: function() {
    if (parseInt(taxi.css("top")) < containerHeight - taxiHeight) {
      taxi.css("top", parseInt(taxi.css("top")) + steps);
      moveDownAnimation = requestAnimationFrame(myTaxi.moveDown);
    }
  },
  moveLeft: function() {
    if (parseInt(taxi.css("left")) > 0) {
      taxi.css("left", parseInt(taxi.css("left")) - steps);
      moveLeftAnimation = requestAnimationFrame(myTaxi.moveLeft);
    }
  },
  moveRight: function() {
    if (parseInt(taxi.css("left")) < containerWidth - taxiWidth) {
      taxi.css("left", parseInt(taxi.css("left")) + steps);
      moveRightAnimation = requestAnimationFrame(myTaxi.moveRight);
    }
  }
};

// Key listeners on arrow keys
$("body").keydown(function(e) {
  var position = taxi.position();
  if (e.keyCode == 38 && moveUpAnimation == false) {
    moveUpAnimation = requestAnimationFrame(myTaxi.moveUp);
  } else if (e.keyCode == 40 && moveDownAnimation == false) {
    moveDownAnimation = requestAnimationFrame(myTaxi.moveDown);
  } else if (e.keyCode == 37 && moveLeftAnimation == false) {
    moveLeftAnimation = requestAnimationFrame(myTaxi.moveLeft);
  } else if (e.keyCode == 39 && moveRightAnimation == false) {
    moveRightAnimation = requestAnimationFrame(myTaxi.moveRight);
  }
});

$("body").keyup(function(e) {
  if (e.keyCode == 38) {
    cancelAnimationFrame(moveUpAnimation);
    moveUpAnimation = false;
  } else if (e.keyCode == 40) {
    cancelAnimationFrame(moveDownAnimation);
    moveDownAnimation = false;
  } else if (e.keyCode == 37) {
    cancelAnimationFrame(moveLeftAnimation);
    moveLeftAnimation = false;
  } else if (e.keyCode == 39) {
    cancelAnimationFrame(moveRightAnimation);
    moveRightAnimation = false;
  }
});

// Function for creating enemy cars
function createObstacles() {
  var obstacles = [];
  for (let i = 1; i < 4; i++) {
    var $enemyCar = $("<div/>").addClass("obstacles");
    $enemyCar.attr("id", "car" + [i]);
    $enemyCar.css("left", getEnemyRandomX());
    $enemyCar.css("top", getEnemyRandomY(-100, -600));
    $enemyCar.appendTo("#container");
    obstacles.push($enemyCar);
  }
  return obstacles;
}

createObstacles();
var $obstacles = $(".obstacles");

var car1 = $("#car1");
var car2 = $("#car2");
var car3 = $("#car3");

// Random number on X axis
function getEnemyRandomX() {
  var random = Math.floor(Math.random() * (containerWidth - taxiWidth));
  return random;
}

// Random number on Y axis
function getEnemyRandomY(min, max) {
  var random = Math.floor(Math.random() * (max - min)) + min;
  return random;
}

// Function for moving the obstacles from the top to the bottom
function car_down(car) {
  var carCurrentTop = parseInt(car.css("top"));
  if (carCurrentTop > containerHeight) {
    carCurrentTop = -steps;
    car.css("left", getEnemyRandomX);
  }
  car.css("top", carCurrentTop + speed);
}

// Function that makes the background Road repeat
function moveRoad() {
  roadPosition++;
  container.css({ backgroundPosition: "0 " + roadPosition + "px" });
}

window.setInterval(moveRoad, 10);

function timer() {
  setInterval(function() {
    car_down(car1);
    car_down(car2);
    car_down(car3);
  }, 1);
}

timer();
