// Selectors
var taxi = $('#taxi');
var container = $('#container');

// Declaring the height and the weight of the taxi and container
var taxiWidth = parseInt(taxi.width());
var taxiHeight = parseInt(taxi.height());
var containerWidth = parseInt(container.width());
var containerHeight = parseInt(container.height());

var myTaxi = {
    name: 'Crazy Taxi',
    position: taxi.position(),
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
    
    if(e.keyCode == 38 && myTaxi.position.top > 0 ) {
        myTaxi.moveUp(myTaxi.position);
    } else if (e.keyCode == 40 && myTaxi.position.top < (containerHeight - taxiHeight)) {
        myTaxi.moveDown(myTaxi.position);
    } else if (e.keyCode == 37 && myTaxi.position.left > 0) {
        myTaxi.moveLeft(myTaxi.position);
    } else if (e.keyCode == 39 && myTaxi.position.left < (containerWidth - taxiWidth)) {
        myTaxi.moveRight(myTaxi.position);
    }
})
