let uvShader;
let brighSlider;

function preload() {
  uvShader = readShader('/vc_page/sketches/shaders/texturing/uv1.frag',
                        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  /*
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  beginShape();
   vertex(-1, -1, 0, 0, 1);
  vertex( 1, -1, 0, 1, 1);
  vertex( 1,  1, 0, 1, 0);
  vertex(-1,  1, 0, 0, 0);
  endShape();
}