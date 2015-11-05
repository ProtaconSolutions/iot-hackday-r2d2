var Cylon = require('cylon');

Cylon.robot({
    connections: {
        arduino: { adaptor: 'firmata', port: 'COM4' }
    },

    devices: {
        servo: { driver: 'continuous-servo', pin: 14 },
        led: { driver: 'led', pin: 13 }
    },

    work: function(my) {
        var clockwise = true;

        my.servo.clockwise();

        every((1).second(), function() {
            if (clockwise) {
                my.servo.counterClockwise();
                clockwise = false;
            } else {
                my.servo.clockwise();
                clockwise = true;
            }
        });
    }
}).start();