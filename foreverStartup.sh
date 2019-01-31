#!/bin/bash
sleep 8
forever start --minUptime 1000 --spinSleepTime 1000 strip_redblue.js >>/home/pi/output.log 2>>/home/pi/error.log
