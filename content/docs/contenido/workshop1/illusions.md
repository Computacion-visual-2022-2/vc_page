# Illusions

# Primrose Field
## Problem Statement


## Background


## Code


{{< details title="Code Primrose Field" open=false >}}
{{< highlight html >}}



function setup() {
    var canvas = createCanvas(408, 408);
   
    noStroke();
  
    // Sketch params
    const squarew = width / 17;
    const flowerw = 2;
    const offset = 3;
    const pattern = [true, false, false, true, false, true, true, false];
  
    // squares
    for (let i = 0; i < width / squarew; i++) {
      for (let j = 0; j < width / squarew; j++) {
        if ((i + j) % 2 == 1) {
          fill(79, 187, 128);
        } else {
          fill(160, 215, 61);
        }
        rect(j * squarew, i * squarew, squarew, squarew);
      }
    }
    // flowers
    for (let i = 1; i < width / squarew; i++) {
      for (let j = 1; j < width / squarew; j++) {
        if (pattern[(j - i) % 8 < 0 ? (j - i) % 8 + 8 : (j - i) % 8]) {
          fill(255);
        } else {
          fill(204, 0, 153);
        }
        ellipse(j * squarew - offset, i * squarew, flowerw * 1.5, flowerw);
        ellipse(j * squarew + offset, i * squarew, flowerw * 1.5, flowerw);
        ellipse(j * squarew, i * squarew - offset, flowerw, flowerw * 1.5);
        ellipse(j * squarew, i * squarew + offset, flowerw, flowerw * 1.5);
      }
    }
    // Static sketch
    noLoop();
  }
  
  //function draw() {}
{{< /highlight >}}
{{< /details >}}

{{<p5-iframe sketch="/vc_page/sketches/primroseField.js" width="725" height="550">}}