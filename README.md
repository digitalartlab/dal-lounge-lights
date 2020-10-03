# Lounge LED Light Effects
This project contains the code to control the LED strips in our Lounge.

## Architecture
### LED Animator
The JavaScript project that generates the patterns for all 960 LEDs in our strips (yes, we control them per pixel. It's very fancy). Each effect is an individual JS file. We're working on organising the project a bit better to make it easier to switch and control the effects. To be continued for sure.

### Fadecandy Server (fcserver)
The software for our controller boards. We use two Fadecandy controllers, each controlling 8 strips of 60 LEDs each. They're connected to a Raspberry Pi with USB. You input OPC commands and the server automagically turns it into almost 1000 sparkling lights.

> Fadecandy is an amazing open source project. Read more about it on [their GitHub repo](https://github.com/scanlime/fadecandy).

## Hardware
### LED strips
We use WS2811 LED strips that are connected to Fadecandy controller boards. Each strip has 60 LEDs and we have 16 strips in total. That makes for a **total of 960 RGB LEDs**.
