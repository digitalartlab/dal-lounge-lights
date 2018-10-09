#!/usr/bin/env node

// Simple red/blue fade with Node and opc.js

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 960; pixel++)
    {
        strip = Math.floor(pixel / 60);
        pixelInStrip = pixel % 60;
        if ((strip % 2) === 1) {
            var t = pixelInStrip * 0.1 + millis * 0.0005 + strip;
        } else {
            var t = pixelInStrip * 0.1 + millis * 0.0005 * -1 + strip * 1.5;
        }
        var red = 128 + 96 * Math.sin(t);
        var green = 128 + 96 * Math.sin(t + 0.75);
        var blue = 128 + 96 * Math.sin(t + 1.5);

        client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
}

setInterval(draw, 30);
