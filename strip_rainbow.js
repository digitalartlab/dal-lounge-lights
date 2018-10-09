#!/usr/bin/env node

// Simple rainbow through all the pixels

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 960; pixel++)
    {
        let hue = (millis * 0.0002 + pixel * 0.001 % 100);
        let colors = OPC.hsv(hue, 1, 1);
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
        //console.log(colors[0], colors[1], colors[2]);
    }
    client.writePixels();
}

setInterval(draw, 30);
