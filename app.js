$(window).on("load", function() {
// Selectors
var taxi = $("#taxi");
var container = $("#container");
var speed = 1;
var roadPosition = 0;
var steps = 20;
var points = 1;
var gameOver = false;


var svgObstacle = `<svg viewBox="0 0 195 280" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <title>background</title>
                        <rect fill="none" id="canvas_background" height="282" width="197" y="-1" x="-1"/>
                        <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                          <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
                        </g>
                        </g>
                        <g>
                        <title>Layer 1</title>
                        <rect id="svg_1" height="260" width="160" y="7.750042" x="17.249995" stroke-width="0" stroke="#000" fill="#ff7f00"/>
                        <ellipse ry="42" rx="14" id="svg_2" cy="67.695318" cx="17.500054" stroke-width="0" stroke="#000" fill="#333333"/>
                        <ellipse ry="42" rx="14" id="svg_3" cy="67.695321" cx="176.997889" stroke-width="0" stroke="#000" fill="#333333"/>
                        <ellipse ry="42" rx="14" id="svg_4" cy="216.443302" cx="17.000051" stroke-width="0" stroke="#000" fill="#333333"/>
                        <ellipse ry="42" rx="14" id="svg_5" cy="216.193302" cx="176.747891" stroke-width="0" stroke="#000" fill="#333333"/>
                        <rect stroke="#000" id="svg_8" height="52.748922" width="118.747583" y="72.998512" x="38.876195" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#00ffff"/>
                        <path stroke="#000" transform="rotate(179.91366577148438 128.7018280029297,96.89814758300781) " id="svg_9" d="m99.781264,120.64824l0,-47.500181l57.841127,47.500181l-57.841127,0z" stroke-opacity="null" stroke-width="0" fill="#aaffff"/>
                        <rect stroke="#000" id="svg_13" height="141.997103" width="9.499806" y="125.747437" x="75.125456" stroke-opacity="null" stroke-width="0" fill="#ffffff"/>
                        <rect stroke="#000" id="svg_14" height="141.997103" width="9.499806" y="125.747437" x="107.124804" stroke-opacity="null" stroke-width="0" fill="#ffffff"/>
                        <rect stroke="#000" id="svg_15" height="65.498661" width="9.499806" y="7.749844" x="75.125456" stroke-opacity="null" stroke-width="0" fill="#ffffff"/>
                        <rect stroke="#000" id="svg_16" height="65.498661" width="9.499806" y="7.749847" x="107.124804" stroke-opacity="null" stroke-width="0" fill="#ffffff"/>
                        <rect id="svg_17" height="10.999776" width="4.249913" y="267.494548" x="29.376388" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#7f7f7f"/>
                        <rect id="svg_18" height="10.999776" width="4.249913" y="267.494548" x="37.876215" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#7f7f7f"/>
                        <ellipse ry="10" rx="10" id="svg_19" cy="21.249567" cx="62.625711" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#ffff00"/>
                        <ellipse ry="10" rx="10" id="svg_23" cy="20.749577" cx="128.874359" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#ffff00"/>
                        <rect id="svg_24" height="5.999878" width="20.249587" y="258.494732" x="24.87648" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#ff0000"/>
                        <rect id="svg_25" height="5.999878" width="20.249587" y="258.244737" x="149.62394" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#ff0000"/>
                        </g>
                      </svg>`


// Declaring the height and the weight of the taxi and container
var taxiWidth = parseInt(taxi.width());
var taxiHeight = parseInt(taxi.height());
var containerWidth = parseInt(container.width());
var containerHeight = parseInt(container.height());

// Request animation variables declaration
var moveUpAnimation = null;
var moveDownAnimation = null;
var moveLeftAnimation = null;
var moveRightAnimation = null;

// Taxi movement declaration
var myTaxi = {
  name: "Crazy Taxi",
  moveUp: ()=> {
    if (parseInt(taxi.css("top")) > 0) {
      taxi.css("top", parseInt(taxi.css("top")) - steps);
      moveUpAnimation = requestAnimationFrame(myTaxi.moveUp);
    }
  },
  moveDown: ()=> {
    if (parseInt(taxi.css("top")) < containerHeight - taxiHeight) {
      taxi.css("top", parseInt(taxi.css("top")) + steps);
      moveDownAnimation = requestAnimationFrame(myTaxi.moveDown);
    }
  },
  moveLeft: ()=> {
    if (parseInt(taxi.css("left")) > 0) {
      taxi.css("left", parseInt(taxi.css("left")) - steps);
      moveLeftAnimation = requestAnimationFrame(myTaxi.moveLeft);
    }
  },
  moveRight: ()=> {
    if (parseInt(taxi.css("left")) < containerWidth - taxiWidth) {
      taxi.css("left", parseInt(taxi.css("left")) + steps);
      moveRightAnimation = requestAnimationFrame(myTaxi.moveRight);
    }
  }
};

// Key listeners on arrow keys
$("body").keydown(function(e) {
  if (e.keyCode == 38) {
    myTaxi.moveUp();
  } else if (e.keyCode == 40) {
    myTaxi.moveDown();
  } else if (e.keyCode == 37) {
    myTaxi.moveLeft();
  } else if (e.keyCode == 39) {
    myTaxi.moveRight();
  }
});

// Key listener on key up so the recursion of requestAnimationFrame can be stopped
$("body").keyup(function(e) {
  if (e.keyCode == 38) {
    cancelAnimationFrame(moveUpAnimation);
    // moveUpAnimation = false;
  } else if (e.keyCode == 40) {
    cancelAnimationFrame(moveDownAnimation);
    // moveDownAnimation = false;
  } else if (e.keyCode == 37) {
    cancelAnimationFrame(moveLeftAnimation);
    // moveLeftAnimation = false;
  } else if (e.keyCode == 39) {
    cancelAnimationFrame(moveRightAnimation);
    // moveRightAnimation = false;
  }
});

// Function for creating enemy cars
function createObstacles() {
  var obstacles = [];
  for (let i = 1; i < 4; i++) {
   // var $enemyCar = $("<svg/>");
   var $enemyCar = $(svgObstacle);
    $enemyCar.addClass("obstacles");
    $enemyCar.attr('id', 'car' + [i]);
    $enemyCar.css("left", getEnemyRandomX());
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


// Function for moving the obstacles from the top to the bottom
function car_down(car) {
  var carCurrentTop = parseInt(car.css("top"));
  if (carCurrentTop > containerHeight) {
    carCurrentTop = car.css("top", -200);
    car.css("left", getEnemyRandomX);
  }
  car.css("top", carCurrentTop + speed);
}

var i = 3;

// Function that makes the background Road repeat
function moveRoad() {
  roadPosition += i;
  if (points % 50 == 0) {
    i += 0.2;
  } 
  container.css({ backgroundPosition: "0 " + roadPosition + "px" });
}

// Function that increases the score on screen
function score() {
  points++;
  $('#score').html(points);
  if (points % 50 == 0) {
    speed++;
  }  
}


// stop the game when crash occurs
var startScoreBoard = window.setInterval(score, 150);

var backgroundRoad = window.setInterval(moveRoad, 10);
var startObstacles = null;

var startTimer = function() {
    startObstacles = setInterval(function() {
    car_down(car1);
    car_down(car2);
    car_down(car3);
    checkCollision();
  }, 1);
}

var stopScoreBoard = ()=> clearInterval(startScoreBoard);
var stopTimer = function() {
  clearInterval(startObstacles);
};
var stopRoad = function(){
  clearInterval(backgroundRoad);
}


// Funciton that checks for collision between taxi and other cars
function checkCollision(){
  var positionTaxi = taxi.position();
  var positionCar1 = car1.position();
  var positionCar2 = car2.position();
  var positionCar3 = car3.position();

  positionTaxi.right = positionTaxi.left + taxi.width();
  positionCar1.right = positionCar1.left + car1.width();
  positionCar2.right = positionCar2.left + car2.width();
  positionCar3.right = positionCar3.left + car3.width();

  positionTaxi.bottom = positionTaxi.top + taxi.height();
  positionCar1.bottom = positionCar1.top + car1.height();
  positionCar2.bottom = positionCar2.top + car2.height();
  positionCar3.bottom = positionCar3.top + car3.height();

  if(collisionDetection(positionTaxi, positionCar1)) {
    stopRoad();
    stopTimer();
    stopScoreBoard();
    gameOver();
  };
  if(collisionDetection(positionTaxi, positionCar2)) { 
    stopRoad();
    stopTimer();
    stopScoreBoard();
    gameOver();
  };
  if(collisionDetection(positionTaxi, positionCar3)) {
    stopRoad();
    stopTimer();
    stopScoreBoard();
    gameOver();
  };
}

function collisionDetection (x,y){
return !(x.right < y.left || 
    x.left > y.right || 
    x.bottom < y.top || 
    x.top > y.bottom)
}

var gameOver = function(){
  $('#game-over').css('display','flex'); //add css
  $('#btn-game-over').click(function(){
    location.reload();
  })
  cancelAnimationFrame(moveRightAnimation);
  cancelAnimationFrame(moveUpAnimation);
  cancelAnimationFrame(moveDownAnimation);
  cancelAnimationFrame(moveLeftAnimation);
  $("body").off();
}

startTimer();

});