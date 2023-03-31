#!/usr/bin/env node

// Green/blue glow that seems to 'point' to our entrance by moving to the center strips
// Special edition of strip_bluepurple.js for an exposition

// We send our data to fcserver through the Open Pixel Control protocol
var OPC = new require('./opc')
var client = new OPC('172.20.0.2', 7890);

function draw() {
    var millis = new Date().getTime();

    // We need to animate every single pixel individually
    for (var pixel = 0; pixel < 960; pixel++)
    {
        // Which strip are we in?
        // We use -8 combined with Math.abs to offset the effect and 'center' it in th middle
        const strip = Math.abs(Math.floor(pixel / 60) - 8);

        // Which pixel are we in the current strip?
        const pixelInStrip = pixel % 60;

        var t = pixelInStrip * 0.1 + millis * 0.002 + strip;

        // Calculate the hue of this pixel
        let hue = Math.sin(t*0.5)*0.1 + 0.5;

        // Convert the hue to RGB
        let colors = OPC.hsv(hue, 1, 1);

        // Send the RGB values on this pixel
        client.setPixel(pixel, colors[0], colors[1], colors[2]);
    }

    // Send all 960 values to fcserver
    client.writePixels();
}

// Keep repeating the function to update the strips every 30ms (cuz that's what animation is)
setInterval(draw, 30);
