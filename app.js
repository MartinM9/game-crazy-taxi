// Selectors
var taxi = $('#taxi');
var container = $('#container');
var car1 = $('#car1');
var car2 = $('#car2');
var car3 = $('#car3');

// Declaring the height and the weight of the taxi and container
var taxiWidth = parseInt(taxi.width());
var taxiHeight = parseInt(taxi.height());
var containerWidth = parseInt(container.width());
var containerHeight = parseInt(container.height());

var myTaxi = {
    name: 'Crazy Taxi',
    moveUp: function (pos) {
        taxi.css('top', pos.top - 20 + 'px');
    },
    moveDown: function (pos) {
        taxi.css('top', pos.top + 20 + 'px');
    },
    moveLeft: function (pos) {
        taxi.css('left', pos.left - 20 + 'px');
    },
    moveRight: function (pos) {
        taxi.css('left', pos.left + 20 + 'px');
    }
}

$('body').keydown(function(e) {
    var position = taxi.position();
    timer();
    if(e.keyCode == 38 && position.top > 0 ) {
        myTaxi.moveUp(position);
    } else if (e.keyCode == 40 && position.top < (containerHeight - taxiHeight)) {
        myTaxi.moveDown(position);
    } else if (e.keyCode == 37 && position.left > 0) {
        myTaxi.moveLeft(position);
    } else if (e.keyCode == 39 && position.left < (containerWidth - taxiWidth)) {
        myTaxi.moveRight(position);
    }
})

var speed = 10;

function car_down(car) {
    var car_current_top = parseInt(car.css('top'));
    if (car_current_top > containerHeight) {
        car_current_top = -200;
        var car_left = parseInt(Math.random() * (containerWidth - taxiWidth));
        car.css('left', car_left);
    }
    car.css('top', car_current_top + speed);
}

function timer() {
    setInterval(() => {
        car_down(car1);
        car_down(car2);
        car_down(car3);
    }, 500);
}