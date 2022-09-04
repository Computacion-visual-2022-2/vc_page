# Illusions

# Primrose Field

## Problem Statement

Study, implement and discuss possible applications of some known visual phenomena and optical illusions.

## Background

The "Primrose's Field" optical illusion was created and designed by Akiyoshi Kitaoka, who was a professor of psychology in Ristumeikan University who dedicates his work to the study and dissemination of perception and optical illusions. 
Kitaoka's best known illusion and one of the most popular illusions of the genre is "Rotsnake" which is based on the Fraser-Wilcox illusion and has been widely used (not always with permission) in publishing and advertising.

Below we can see the Rotsnake illusion.
![Rotsnake](https://www.epsilones.com/material/ilusionesopticas/012-rotsnake.jpg)

In the Primrose's Field illusion you will see a checkered background consisting of an alternation of light green and dark green squares. In the corners of the squares, there are primroses in the colors of magenta and white.
However, there is a 1 square outer perimeter with only two primroses on them.

According to Kitaoka, there are two factors that affect the strength of his illusory motion:

1. The peripheral drift illusion is enhanced by stepwise luminance profiles.
2. The peripheral drift illusion is enhanced by fragmented or curved edges.

In this illusion, for our brain the tones through the patterns are the key, from dark to midtone to light. But the size and thickness of the primroses are also crucial.
One theory is that the illusion of movement arises because the brain takes longer to process low-contrast junctions. According to the scientists, the waves seen in the illusion have to do with "fixation jitter" which are involuntary eye movements that give the illusion the effect that it is moving.

Kitoaka explained: "Visual neurons respond faster to the higher-contrast elements than to lower-contrast elements. Therefore, the motion signals are faster for the higher-contrast elements, which makes sense because such contrast-dependent timing differences would mimic the sequence of a stimulus that moved from the position of the higher contrast element to that of the lower."

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

{{<p5-iframe sketch="/vc_page/sketches/primroseField.js" width="410" height="410">}}

## Conclusions

#### References
* http://www.ritsumei.ac.jp/~akitaoka/index-e.html
* https://www.timesnownews.com/viral/explained-primroses-field-optical-illusion-a-checkered-background-that-appears-to-wave-article-93000350