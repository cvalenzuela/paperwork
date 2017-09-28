//
// Take a snapshot.
//

const NodeWebcam = require("node-webcam");
const colors = require("colors");
const readline = require('readline');
const emoji = require('node-emoji');
const movie = require('./movie');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let snapshotOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location",
  verbose: false
};

const Webcam = NodeWebcam.create(snapshotOptions);

// Set the Camera Settings
let setCamera = (callback) =>  {
  let cameraToUse;

  Webcam.list((arrayOfAvailableCameras) => {
    console.log(`Available Cameras to use: `.cyan);
    console.log(arrayOfAvailableCameras);

    rl.question(`Choose which camera to use ${emoji.get('camera')}. Enter a number: `, (cameraNumber) => {
      cameraToUse = cameraNumber - 1;
      if(arrayOfAvailableCameras[cameraToUse]){
        console.log(`${emoji.get('zap')}  Cool! Using ${arrayOfAvailableCameras[cameraToUse]} ${emoji.get('zap')}`);
        snapshotOptions.device = arrayOfAvailableCameras[cameraToUse];
        callback();
      } else {
        console.log(`${emoji.get('exclamation')} ${cameraNumber} is not a valid camera, try again`);
        setCamera(callback)
      }
    });
  });
}

// Take a picture
let takePicture = (imagePath, fileFormat, videoPath) => {
  let current_date = String(Date.now());
  let destination = imagePath + current_date + fileFormat;
  Webcam.capture(destination, (err, data) => {
    err ? console.log(`Error saving picture to ${destination}`.red) : console.log(`${emoji.get('unicorn_face')}  New image saved to ${destination}`.green);
    movie.createMovie(videoPath, imagePath, fileFormat);
  });
};

module.exports = {
  setCamera: setCamera,
  takePicture: takePicture
}