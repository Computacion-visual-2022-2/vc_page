let pg;
let truchetShader, brickShader,colorShader;
let theShader;
let selectShader;
let selectShape;
let shapeValue = 0;

function preload() {
  // shader adapted from here: https://thebookofshaders.com/09/
  truchetShader = readShader('/vc_page/sketches/shaders/procedural/truchet.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  brickShader = readShader('/vc_page/sketches/shaders/procedural/brick.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
  colorShader = readShader('/vc_page/sketches/shaders/procedural/color.frag',
                             { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
  createCanvas(400, 400, WEBGL);
  // create frame buffer object to render the procedural texture
  pg = createGraphics(400, 400, WEBGL);
  textureMode(NORMAL);
  noStroke();
  
  pg.noStroke();
  pg.textureMode(NORMAL);
  
  selectShader = createSelect();
  selectShader.position(10, 10);
  selectShader.style('color', 'black');
  selectShader.option('Truchet', 0);
  selectShader.option('Brick', 1);
  selectShader.option('Color', 2);
  selectShader.changed(selectShaderEvent);
  
  selectShape = createSelect();
  selectShape.position(300, 10);
  selectShape.style('color', 'black');
  selectShape.option('Cylinder', 0);
  selectShape.option('Sphere', 1);
  selectShape.option('Box', 2);
  selectShape.changed(selectShapeEvent);
  
  theShader = truchetShader;
  // use truchetShader to render onto pg
  pg.shader(theShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(theShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  theShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
  
}

function selectShaderEvent(){
  shaderValue = selectShader.value();
  if(shaderValue == 0){
      theShader = truchetShader;
    }else if(shaderValue == 1){
      theShader = brickShader;
      console.log('brick');
    }else if(shaderValue == 2){
      theShader = colorShader;
    }
  
  pg.shader(theShader);
  // emitResolution, see:
  // https://github.com/VisualComputing/p5.treegl#macros
  pg.emitResolution(theShader);
  // https://p5js.org/reference/#/p5.Shader/setUniform
  theShader.setUniform('u_zoom', 3);
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // set pg as texture
  texture(pg);
}

function selectShapeEvent(){
  shapeValue = selectShape.value();
}

function draw() {
  background(33);
  orbitControl();
  
  if (shapeValue == 0){
    cylinder(100, 200);
  } else if (shapeValue == 1){
    sphere(120);
  } else {
    box(150,150,150);
  }
}

function mouseMoved() {
  // https://p5js.org/reference/#/p5.Shader/setUniform
  theShader.setUniform('u_zoom', int(map(mouseX, 0, width, 1, 30)));
  // pg clip-space quad (i.e., both x and y vertex coordinates ∈ [-1..1])
  pg.quad(-1, -1, 1, -1, 1, 1, -1, 1);
}
