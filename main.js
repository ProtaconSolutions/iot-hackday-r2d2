'use strict';

var Cylon = require('cylon');


Cylon.robot({
    name: 'r2d2',

    // These are the events that will be registered in the API
    events: ['drive', 'hoot'],

    // These are the commands that will be availble in the API
    // Commands method needs to return an object with the aliases
    // to the robot methods.
    commands: function() {
        return {
            drive: this.drive,
            hoot: this.hoot
        };
    },

    connections: {
        arduino: { adaptor: 'firmata', port: 'COM4' }
    },

    devices: {
        servo: { driver: 'continuous-servo', pin: 14 },
        servo2: { driver: 'continuous-servo', pin: 15 },
        servo3: { driver: 'continuous-servo', pin: 16 },
        servo4: { driver: 'continuous-servo', pin: 17 },
        buzzer: { driver: 'led', pin: 11 }
    },

    work: function() {
    },

    drive: function(data ) {
        this.servo.rotateWithSpeed(data.speedBR);
        this.servo2.rotateWithSpeed(data.speedBL);
        this.servo3.rotateWithSpeed(data.speedFR);
        this.servo4.rotateWithSpeed(data.speedFL);
    },

    hoot: function() {
        this.buzzer.toggle();
    }
});

// ensure you install the API plugin first:
// $ npm install cylon-api-socket-io
Cylon.api(
    'socketio',
    {
        host: '192.168.140.132',
        port: '3333'
    });

Cylon.start();