#!/usr/bin/env node

// Simple rainbow through all the pixels

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 960; pixel++)
    {
        const strip = Math.abs(Math.floor(pixel / 60) - 8);
        const pixelInStrip = pixel % 60;
        let hue = (millis * 0.0001 + pixelInStrip * 0.003 + strip * .05) % 100;
        let colors = OPC.hsv(hue, 1, 1);
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
    }
    client.writePixels();
}

setInterval(draw, 30);
