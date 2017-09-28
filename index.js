/*
=================
Paper Animation

Cristóbal Valenzuela && Alejandro Matamala
2017
=================
*/

const camera = require('./camera');
const movie = require('./movie');
const readline = require('readline');
const colors = require("colors");
const emoji = require('node-emoji')

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const fileFormat = '.jpg';
const imagePath = './images/';
const videoPath = './public/videos/';

let runApp = () => {
  console.log(`${emoji.get('sparkles')}  Lock and loaded. I'm ready, just waiting for someone to push a button...`.green)
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    if (key.name === 'p') {
      camera.takePicture(imagePath, fileFormat, videoPath);
    } else if (key.name === 'v') {
      movie.createMovie(videoPath, imagePath, fileFormat);
    }
  });
}

// Set up camera first
console.log(`${emoji.get('sparkles')}  Starting ${emoji.get('sparkles')} `.green)
camera.setCamera(runApp);

