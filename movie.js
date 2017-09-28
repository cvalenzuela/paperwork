//
// Creates a mp4 based on a folder of images
//

const fs = require('fs');
const videoshow = require('videoshow')
const colors = require("colors");
const emoji = require('node-emoji')

let videoOptions = {
  fps: 25,
  loop: 0.2, // seconds
  transition: false,
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

let createMovie = (videoPath, imagesPath, imageFormat) => {
  let validIimages = [];
  var test = 'matalmala'
  console.log(`Creating a movie... ${test}`.yellow)
  fs.readdir(imagesPath, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.indexOf(imageFormat) >= 0) {
        validIimages.push(imagesPath + file);
      }
    })
    validIimages.length > 0 && makeMovieFromValidImages(validIimages, videoPath);
  })
}

let makeMovieFromValidImages = (validIimages, videoPath) => {
  let currentDate = String(Date.now());
  videoPath = videoPath + 'animation' + '.mp4'; // videoPath = videoPath + currentDate + '.mp4';
  videoshow(validIimages, videoOptions)
  .save(videoPath)
  .on('start', (command) => {
    console.log(`${emoji.random().emoji}  Processing new movie ${emoji.random().emoji}`.yellow);
  })
  .on('error', (err, stdout, stderr) => {
    console.error(`Error: ${err}`.red);
    console.error(`ffmpeg stderr: ${stderr}`.red);
  })
  .on('end', (output) => {
    console.error(`${emoji.get('unicorn_face')}   Movie updated in: ${output} ${emoji.get('unicorn_face')}`.green);
  })
}

module.exports = {
  createMovie: createMovie
}