let blendShader;
let color_picker1, color_picker2;
let color1, color2;

function preload() {
  blendShader = readShader('/vc_page/sketches/shaders/coloring/blend.frag');
}

function setup() {
  createCanvas(350,350, WEBGL);
  
  colorMode(RGB, 1);
  
  color_picker1 = createColorPicker(color(0.8, 0.5, 0.3));
  color_picker1.position(45, 10);
  
  color_picker2 = createColorPicker(color(0.9, 0.1, 0.4));
  color_picker2.position(205, 10);
  
  shader(blendShader);
}

function draw() {
  background(0);
  
  color1 = color_picker1.color();
  color2 = color_picker2.color();
  
  blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1)]);
  blendShader.setUniform('uMaterial2', [1.0, 1.0, 1.0]);
  rect(-130, -120, 100, 100);
  
  
  blendShader.setUniform('uMaterial1', [1.0, 1.0, 1.0]);
  blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2)]);
  rect(30, -120, 100, 100);
  
  
  blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1)]);
  blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2)]);
  rect(-50, 20, 100, 100);
}