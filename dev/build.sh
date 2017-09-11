#! /bin/bash

browserify client.js -o dist/her.js
stylus html/styles/her.styl -o dist/

if [ $1 ]; then uglifyjs dist/her.js > dist/her.js; fi