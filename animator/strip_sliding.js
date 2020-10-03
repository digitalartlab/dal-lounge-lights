#!/usr/bin/env node

// Rainbow with white stripe sliding through

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

var glowPixels = new Array();
var randomPixel;

function getRandomPixel() {
  return Math.floor(Math.random() * 960);
}
function draw() {
    let millis = new Date().getTime();
  
    for (var pixel = 0; pixel < 960; pixel++)
    {
        strip = Math.floor(pixel / 60);
        millisNew = (millis / 500) + strip;
        hue = (millis * 0.0002 + pixel * 0.001 % 100);

        white = (Math.floor(Math.floor(millis / 5000 + (pixel % 60 / 20)) % 4 / 2));
        colors = OPC.hsv(hue, white, 1);
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
    }
    client.writePixels();
}

setInterval(draw, 250);
