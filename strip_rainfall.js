#!/usr/bin/env node

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);

var glowPixels = new Array();
var randomPixel;

/* function getGlow(pixel) {
  for(var i = 0; i < glowPixels.length; i++) {
    if(glowPixels[i].pixel == pixel) {
      console.warn(pixel);
      return 0;
    }
    else {
      return 1;
    }
  }
}
function getRandomPixel() {
  return Math.floor(Math.random() * 960);
}
function pickPixel() {
  var millis;
  var randomPixelInfo;
  var randomPixel;
  randomPixel = getRandomPixel();
  millis = new Date().getTime() / 1000;
  
  randomPixelInfo = { pixel: randomPixel, time: millis };
  glowPixels.push(randomPixelInfo);

  setTimeout(function(){
    for(var i = 0; i < glowPixels.length; i++) {
      if(glowPixels[i].time == millis) {
          glowPixels.splice(i, 1);
          break;
      }
    }
  },3000);
} */
function draw() {
    let millis = new Date().getTime();

    for (var pixel = 0; pixel < 960; pixel++)
    {
        let saturation = 1;
        strip = Math.floor(pixel / 60);
        millisNew = (millis / 500) + strip;
        hue = (0.05 * (Math.sin(millisNew) * -1) + 0.72 % 100);
        random = Math.random();
        if ( random > 0.99 ) {
          saturation = 0;
        }
        colors = OPC.hsv(hue, saturation, 1);
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
    }
    client.writePixels();
}
function logPixel() {
  console.warn(glowPixels);
}

setInterval(draw, 175);
// setInterval(pickPixel, 250);
// setInterval(logPixel, 3000);