let lumaShader;
let img;
let grey_scale;
let selection_box;
let coloring_tool = 0;
let color_picker;
let tinting;

function preload() {
  lumaShader = readShader('/vc_page/sketches/shaders/texturing/luma.frag',
                        { varyings: Tree.texcoords2 });
  // image source: https://t.ly/Dz8W
  img = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Fire_breathing_2_Luc_Viatour.jpg/800px-Fire_breathing_2_Luc_Viatour.jpg');
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  
  colorMode(RGB, 1);
  
  shader(lumaShader);

  selection_box = createSelect();
  selection_box.position(15, 20);
  selection_box.style('color', 'black');
  selection_box.option('Original', 0);
  selection_box.option('Component Average', 1);
  selection_box.option('Luma', 2);
  selection_box.option('HSV', 3);
  selection_box.option('HSL', 4);
  selection_box.changed(selectEvent);
  
  tinting = createCheckbox('Tinting', false);
  tinting.style('color', 'white');
  tinting.position(15, 45);
  
  color_picker = createColorPicker(color(1.0, 0.0, 0.0));
  color_picker.position(15, 70);
  
  lumaShader.setUniform('texture', img);
}

function selectEvent(){
  coloring_tool = selection_box.value();
}

function draw() {
  background(0);
  
  tintingColor = color_picker.color();
  
  lumaShader.setUniform('coloring_tool', coloring_tool);
  
  if (tinting.checked()) {
    lumaShader.setUniform('tinting', true);
    lumaShader.setUniform('tintingColor', [red(tintingColor), green(tintingColor), blue(tintingColor), 1.0]);
  } else {
    lumaShader.setUniform('tinting', false);
  }
  
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}