# Visual masking

# Convolution masks

## Problem Statement
Implement an image processing web app supporting different image kernels and supporting:
- Image histogram visualization.
- Different lightness (coloring brightness) tools.

## Background

### Kernel
Convolution, Kernel or Mask is an image processing technique in which an odd-sized matrix is used to achieve effects such as sharpening, blurring or enhancement. These masks are achieved by convolution between a kernel and an image, changing the intensity of a pixel to reflect the intensities of the surrounding piexels.

Convolution is also useful to sharpen or enhance some qualities of images, which are very useful when dealing with scientific images.

The following kernels are the ones we use in the code.

__1. Identity:__ This mask returns the same image.

{{< katex >}}
\begin{bmatrix}
0 & 0 & 0\\
0 & 1 & 0\\
0 & 0 & 0
\end{bmatrix}
{{< /katex >}}

__2. Sharpen:__ The sharpen kernel emphasizes the differences in adjacent pixel values which makes the image appear more vivid.

{{< katex >}}
\begin{bmatrix}
0 & -1 & 0\\
-1 & 5 & -1\\
0 & -1 & 0
\end{bmatrix}
{{< /katex >}}

__3. Edge Detection:__ The mask to find the points of drastic change of brightness in an image.

{{< katex >}}
\begin{bmatrix}
-1 & -1 & -1\\
-1 & 8 & -1\\
-1 & -1 & -1
\end{bmatrix}
{{< /katex >}}

__4. Box blur:__ A Box Blur is a linear filter in which each pixel results from the average value of its neighbors.  

{{< katex >}}
\frac{1}{9}
\begin{bmatrix}
1 & 1 & 1\\
1 & 1 & 1\\
1 & 1 & 1
\end{bmatrix}
{{< /katex >}}


### Histogram
A histogram is a graphical representation that displays how frequently various color values occur in an image. The histogram focuses only on the proportion of the colors and not the location of the colors in the Images. They show the statistical distribution of colors and the essential tones present in the image.


### Lightness
Saturation is the intensity of a hue from gray tone (no saturation) to pure, vivid color (high saturation). Brightness is the relative lightness or darkness of a particular color, from black (no brightness) to white (full brightness). Brightness is also called Lightness in some contexts, in particular in SQL queries.
The definition used in photometry and colorimetry describes the non-linear perception we have of the amount of light received, which is often defined from the luminance of the source studied. 

## Code

### Kernels

| Shortcut | Description |
| -------- | ----------- |
| 0 | Identity |
| 1 | Sharpen|
| 2 | Edge Detection |
| 3 | Box Blur|

{{< details title="Code Kernel" open=false >}}
{{< highlight html >}}
let img;

//Identidad
var kernel = [
   [0, 0, 0],
   [0, 1, 0],
   [0, 0, 0]
];

function preload() {
   img = loadImage('/vc_page/sketches/mandrill.png');
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

function keyPressed() {

	if (key === '0') { //Identidad
      kernel = [
         [0, 0, 0],
         [0, 1, 0],
         [0, 0, 0]
      ];
    } else if (key === '1') { //Sharpen - Enfocar
      kernel = [
         [0, -1, 0],
         [-1, 5, -1],
         [0, -1, 0]
      ];
    } else if (key === '2') { //Detección de bordes
      kernel = [
         [-1, -1, -1],
         [-1, 8, -1],
         [-1, -1, -1]
      ];  
    }  else if (key === '3') { //Desenfoque
      kernel = [
         [1/9, 1/9, 1/9],
         [1/9, 1/9, 1/9],
         [1/9, 1/9, 1/9]
      ];
    }
}
//Ref: https://p5js.org/examples/image-convolution.html
{{< /highlight >}}
{{< /details >}}

{{<p5-iframe sketch="/vc_page/sketches/kernels.js" width="425" height="425">}}
  
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


### References
* https://setosa.io/ev/image-kernels/
* https://en.wikipedia.org/wiki/Kernel_(image_processing)
* https://photographylife.com/understanding-histograms-in-photography
* https://manifold.net/doc/mfd8/colors_as_hue_saturation_and_brightness.htm
* http://www.workwithcolor.com/color-properties-definitions-0101.htm
