let easycam;
let uvShader;
let opacity, colorB;
let selection_box;
let figure = 'Rectangle';

function preload() {
  // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
  // The projection and modelview matrices may be emitted separately
  // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
  // leads to the same gl_Position result.
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/vc_page/sketches/shaders/texturing/uv2.frag',
              { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
  createCanvas(300, 300, WEBGL);
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation: [0, 0, 0, 1],  // quaternion
  };
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  textureMode(NORMAL);
  
  selection_box = createSelect();
  selection_box.position(10, 10);
  selection_box.style('color', 'black');
  selection_box.option('Rectangle');
  selection_box.option('Triangle');
  selection_box.option('Circle');
  selection_box.changed(selectEvent);
  
  opacity = createSlider(0, 1, 0.5, 0.01);
  opacity.position(10, 30);
  opacity.style('width', '280px');
  
  colorB = createSlider(0, 1, 0.5, 0.01);
  colorB.position(10, 50);
  colorB.style('width', '280px');
}

function selectEvent(){
  figure = selection_box.value();
}

function draw() {
  background(200);
  // reset shader so that the default shader is used to render the 3D scene
  resetShader();
  // world space scene
  axes();
  grid();
  translate(0, -70);
  rotateY(0.5);
  fill(color(255, 0, 255, 125));
  box(30, 50);
  translate(70, 70);
  fill(color(0, 255, 255, 125));
  sphere(30, 50);
  // use custom shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  uvShader.setUniform('opacity', opacity.value());
  uvShader.setUniform('colorB', colorB.value());
  // screen-space quad (i.e., x ∈ [0..width] and y ∈ [0..height])
  // see: https://github.com/VisualComputing/p5.treegl#heads-up-display
  beginHUD();
  noStroke();
  
  if (figure == 'Rectangle'){
    quad(0, 0, width, 0, width, height, 0, height);
  } else if (figure == 'Circle'){
    circle(width/2, height/2, width, height);
  } else {
    triangle(width/2, 0, 0, height, width, height);
  }
  endHUD();
}

function mouseWheel(event) {
  //comment to enable page scrolling
  return false;
}