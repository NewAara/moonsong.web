#! /bin/bash

nodemon -w account -w index -w interpreter -w html -w util -w html/styles -x "dev/build.sh" & 
nodemon -w dist server.js