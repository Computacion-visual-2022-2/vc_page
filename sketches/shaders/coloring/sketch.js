let blendShader;
let color_picker1, color_picker2;
let color1, color2;
let brighSlider;

let select_type;
let type = 0;

function preload() {
  blendShader = readShader('/vc_page/sketches/shaders/coloring/blend.frag');
}

function setup() {
  createCanvas(350,370, WEBGL);
  
  colorMode(RGB, 1);
  
  color_picker1 = createColorPicker(color(0.8, 0.5, 0.3));
  color_picker1.position(50, 30);
  
  color_picker2 = createColorPicker(color(0.9, 0.1, 0.4));
  color_picker2.position(210, 30);
  
  brighSlider = createSlider(0, 1, 1.0, 0.01);
  brighSlider.position(140, 185);
  brighSlider.style('width', '80px');
  
  select_type = createSelect();
  select_type.position(140, 330);
  select_type.style('color', 'black');
  select_type.option('Multiply', 0);
  select_type.option('Add', 1);
  select_type.option('Darkest', 2);
  select_type.option('Lightest', 3);
  select_type.option('Difference', 4);
  select_type.changed(selectEventType);
  
  shader(blendShader);
}

function selectEventType(){
  type = select_type.value();
}

function draw() {
  background(0);
  
  color1 = color_picker1.color();
  color2 = color_picker2.color();
  
  blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1)]);
  blendShader.setUniform('uMaterial2', [1.0, 1.0, 1.0]);
  blendShader.setUniform('brightness', 1.0);
  blendShader.setUniform('blendType', 0);
  rect(-130, -120, 100, 100);
  
  
  blendShader.setUniform('uMaterial1', [1.0, 1.0, 1.0]);
  blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2)]);
  blendShader.setUniform('brightness', 1.0);
  blendShader.setUniform('blendType', 0);
  rect(30, -120, 100, 100);
  
  
  blendShader.setUniform('uMaterial1', [red(color1), green(color1), blue(color1)]);
  blendShader.setUniform('uMaterial2', [red(color2), green(color2), blue(color2)]);
  blendShader.setUniform('brightness', brighSlider.value());
  blendShader.setUniform('blendType', type); 
  rect(-50, 20, 100, 100);
}