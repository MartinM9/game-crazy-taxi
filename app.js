// Selectors
var taxi = $("#taxi");
var container = $("#container");
var speed = 2;
var roadPosition = null;
var steps = 20;// in px

// Declaring the height and the weight of the taxi and container
var taxiWidth = parseInt(taxi.width());
var taxiHeight = parseInt(taxi.height());
var containerWidth = parseInt(container.width());
var containerHeight = parseInt(container.height());

// Taxi movement declaration
var myTaxi = {
  name: "Crazy Taxi",
  moveUp: function(pos) {
    taxi.css("top", pos.top - steps + "px");
    move_up = requestAnimationFrame(moveUp);
  },
  moveDown: function(pos) {
   taxi.css("top", pos.top + steps + "px");
  },
  moveLeft: function(pos) {
    taxi.css("left", pos.left - steps + "px");
  },
  moveRight: function(pos) {
    taxi.css("left", pos.left + steps + "px");
  }
};

// Key listeners on arrow keys
$("body").keydown(function(e) {
  var position = taxi.position();
  if (e.keyCode == 38 && position.top > 0) {
    myTaxi.moveUp(position);
    move_up = requestAnimationFrame(moveUp);
  } else if (e.keyCode == 40 && position.top < containerHeight - taxiHeight) {
    myTaxi.moveDown(position);
  } else if (e.keyCode == 37 && position.left > 0) {
    myTaxi.moveLeft(position);
  } else if (e.keyCode == 39 && position.left < containerWidth - taxiWidth) {
    myTaxi.moveRight(position);
  }
});

// Function for creating enemy cars
function createObstacles() {
  var obstacles = [];
  for (let i = 1; i < 4; i++) {
    var $enemyCar = $("<div/>").addClass("obstacles");
    $enemyCar.attr('id', 'car'+[i]);
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
    container.css({'backgroundPosition': '0 ' + roadPosition + 'px'});
}

window.setInterval(moveRoad, 10)

function timer() {
    setInterval(function(){
        car_down(car1);
        car_down(car2);
        car_down(car3);
    }, 1)
}

timer()