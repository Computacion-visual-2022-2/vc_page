# Visual masking

# Convolution masks

## Problem Statement
Implement an image processing web app supporting different image kernels and supporting:
- Image histogram visualization.
- Different lightness (coloring brightness) tools.

## Background

A histogram is a graphical representation that displays how frequently various color values occur in an image. The histogram focuses only on the proportion of the colors and not the location of the colors in the Images. They show the statistical distribution of colors and the essential tones present in the image.


Saturation is the intensity of a hue from gray tone (no saturation) to pure, vivid color (high saturation). Brightness is the relative lightness or darkness of a particular color, from black (no brightness) to white (full brightness). Brightness is also called Lightness in some contexts, in particular in SQL queries.

## Code

### Kernels

{{< details title="Code Kernel" open=false >}}
{{< highlight html >}}
let img;

/*
//Identidad
let kernel = [
   [0, 0, 0],
   [0, 1, 0],
   [0, 0, 0]
];
*/

/*
//Sharpen - Enfocar
let kernel = [
   [0, -1, 0],
   [-1, 5, -1],
   [0, -1, 0]
];
*/

//Detección de bordes
let kernel = [
   [-1, -1, -1],
   [-1, 8, -1],
   [-1, -1, -1]
];


/*
//Desenfoque
let kernel = [
   [1/9, 1/9, 1/9],
   [1/9, 1/9, 1/9],
   [1/9, 1/9, 1/9]
];
*/
function preload() {
   img = loadImage('/vc_page/sketches/lenna.png');
}

 function setup() {
    createCanvas(400, 400);
    img.loadPixels();
}

 function draw() {
   newImg = createImage(img.width, img.height);
   newImg.loadPixels();
   
   for (let x = 0; x < img.width; x++) {
     for (let y = 0; y < img.height; y++) {
        let c = convolution(x, y, kernel);
            let index = 4 * (x + img.width * y);
            newImg.pixels[index] = red(c);
            newImg.pixels[index + 1] = green(c);
            newImg.pixels[index + 2] = blue(c);
            newImg.pixels[index + 3] = alpha(c);
        }
    }
   
   newImg.updatePixels();
   image(newImg, 0, 0,width,height);
   
   noLoop();
}

function convolution(x, y, matrix) {
  
  let rtotal = 0;
  let gtotal = 0;
  let btotal = 0;
  
  for (kx = -1; kx <= 1; kx++) {
    for (ky = -1; ky <= 1; ky++) {
      let xpos = x + kx;
      let ypos = y + ky;
      
      let r = 0;
      let g = 0;
      let b = 0;
      
      let index = 4 * (xpos + img.width * ypos);
      
      index = constrain(index, 0 , img.pixels.length - 1);
            
      r = img.pixels[index];
      g = img.pixels[index + 1];
      b = img.pixels[index + 2];
      
      rtotal += matrix[kx + 1][ky + 1] * r;
      gtotal += matrix[kx + 1][ky + 1] * g;
      btotal += matrix[kx + 1][ky + 1] * b;
      }
  }
  
  //Se verefica que este dentro de RGB
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  
  return color(rtotal, gtotal, btotal);
}

//Ref: https://p5js.org/examples/image-convolution.html
{{< /highlight >}}
{{< /details >}}

{{<p5-iframe sketch="/vc_page/sketches/kernels.js" width="725" height="425">}}
  
### Histograma
{{< details title="Code Histogram" open=false >}}
{{< highlight html >}}
let img;

function preload() {
  img = loadImage('/vc_page/sketches/lenna.png');
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
{{< /highlight >}}
{{< /details >}}

{{<p5-iframe sketch="/vc_page/sketches/histogram.js" width="725" height="550">}}


## Conclusions
