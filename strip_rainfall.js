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
    var currentGlow = glowPixels.map(a => a.pixel);
  
    for (var pixel = 0; pixel < 960; pixel++)
    {
        let saturation = 1;
        strip = Math.floor(pixel / 60);
        millisNew = (millis / 500) + strip;
        hue = (0.05 * (Math.sin(millisNew) * -1) + millis / 50000 % 100);
        if ( currentGlow.indexOf(pixel) > -1 ) {
          saturation = 0;
        }
        colors = OPC.hsv(hue, 1, saturation);
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
    }
    client.writePixels();
}
function logPixel() {
  console.warn(glowPixels);
}

setInterval(draw, 175);
setInterval(pickPixel, 3);
// setInterval(logPixel, 3000);