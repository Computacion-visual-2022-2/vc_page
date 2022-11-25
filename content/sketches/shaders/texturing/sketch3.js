let lumaShader;
let img;
let grey_scale;
let selection_box;
let coloring_tool = 'None';
let coloring_tool_value = 0;

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
  shader(lumaShader);

  selection_box = createSelect();
  selection_box.position(10, 10);
  selection_box.style('color', 'black');
  selection_box.option('Original');
  selection_box.option('Component Average');
  selection_box.option('Luma');
  selection_box.option('HSV');
  selection_box.option('HSL');
  selection_box.changed(selectEvent);


//  grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
  
  lumaShader.setUniform('texture', img);
}

function selectEvent(){
  coloring_tool = selection_box.value();
  if (coloring_tool == 'Original'){
    coloring_tool_value = 0;
  }else if(coloring_tool == 'Component Average'){
    coloring_tool_value = 1;
  }else if(coloring_tool_value == 'Luma'){
    coloring_tool_value = 2;
  }else if(coloring_tool_value == 'HSV'){
    coloring_tool_value = 3;
  }else{
    coloring_tool_value = 4;
  }
}

function draw() {
  background(0);
  
  lumaShader.setUniform('coloring_tool', coloring_tool_value);
  
  quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}