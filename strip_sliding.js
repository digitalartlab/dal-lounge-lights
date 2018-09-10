#!/usr/bin/env node

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

var glowPixels = new Array();
var randomPixel;

function getRandomPixel() {
  return Math.floor(Math.random() * 960);
}
function pickPixel() {
  var millis;
  var randomPixelInfo;
  var randomPixel;
  var duration;
  randomPixel = getRandomPixel();
  millis = new Date().getTime() / 1000;
  duration = Math.floor(Math.random() * (1000 - 30 + 1)) + 30;
  randomPixelInfo = { pixel: randomPixel, time: millis };
  glowPixels.push(randomPixelInfo);

  setTimeout(function(){
    for(var i = 0; i < glowPixels.length; i++) {
      if(glowPixels[i].time == millis) {
          glowPixels.splice(i, 1);
          break;
      }
    }
  },duration);
}
function draw() {
    let millis = new Date().getTime();
  
    for (var pixel = 0; pixel < 960; pixel++)
    {
        let saturation = 1;
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
setInterval(pickPixel, 3);