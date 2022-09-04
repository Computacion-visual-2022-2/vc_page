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
