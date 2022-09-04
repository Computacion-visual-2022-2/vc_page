let img;

function preload() {
  img = loadImage('/vc_page/sketches/mandrill.png');
  //img = loadImage('sketches/mahakala.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  background(220);
  image(img, 0, 0, img.width, img.height);

  var hist = [];
    for (let i = 0; i < 256; i++) {
      hist[i] = 0;
    }
    img.loadPixels();
    // Calculate the histogram
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        let index = (i + j * img.width) * 4;
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        //println(c,col);
        let bright = floor((r + g + b) / 3);
        hist[bright]++;
        //break;
      }
    }

    // Find the largest value in the histogram
    var histMax = max(hist);

    stroke(255);
    // Draw half of the histogram (skip every second value)
    for (let i = 0; i < img.width; i += 2) {
      // Map i (from 0..img.width) to a location in the histogram (0..255)
      let which = int(map(i, 0, img.width, 0, 255));
      // Convert the histogram value to a location between
      // the bottom and the top of the picture
      let y = int(map(hist[which], 0, histMax, img.height, 0));
      line(i, img.height, i, y);
    }
}

//Ref: https://processing.org/examples/histogram.html