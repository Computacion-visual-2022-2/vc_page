let easycam;
let ambientShader;
let items;
let trange;
let lightSlider;
let itemsSlider;
let color_picker;
let colorValue;

function preload() {
  ambientShader = readShader('/vc_page/sketches/shaders/lighting/ambient.frag', {varyings: Tree.NONE,});
}

function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(RGB, 1);
  //setAttributes('ambient', true);
  
  // easycam stuff
  let state = {
    distance: 250,           // scalar
    center: [0, 0, 0],       // vector
    rotation : [-0.285, -0.257, -0.619, 0.685],  // quaternion
  };
  
  easycam = createEasyCam();
  easycam.state_reset = state;   // state to use on reset (double-click/tap)
  easycam.setState(state, 2000); // now animate to that state
  
  trange = 80;
  items = [];
  
  for (let i = 0; i < 100; i++) {
    items.push({
      position: createVector(
        (random()*2-1) * trange,
        (random()*2-1) * trange,
        (random()*2-1) * trange
      ),
      size: random() * 45 ,
      color: color(random(), random(), random()),
    });
  }
  
  itemsSlider = createSlider(1, items.length, int(items.length / 3), 1);
  itemsSlider.position(20, 20);
  itemsSlider.style('width', '80px');
  
  ambientLightSlider = createSlider(0, 1, 0.5, 0.05);
  ambientLightSlider.position(300, 20);
  ambientLightSlider.style('width', '80px');
  ambientLightSlider.input(ambientLightEvent);  

  color_picker = createColorPicker(color(1.0, 1.0, 1.0));
  color_picker.position(20, 50)
  color_picker.input(colorPickerEvent);
  
  shader(ambientShader);
  ambientShader.setUniform("ambient", ambientLightSlider.value());
  ambientShader.setUniform("lightColor", [1.0, 1.0, 1.0, 1.0]);
  
}

function ambientLightEvent(){
  ambientLightValue = ambientLightSlider.value();
  
  ambientShader.setUniform("ambient", ambientLightValue);
}

function colorPickerEvent(){
  colorValue = color_picker.color();
  
  ambientShader.setUniform("lightColor", [red(colorValue),green(colorValue),blue(colorValue),1.0]);
}

function draw() {
  background(0);
  
  push();
  stroke("green");
  axes();
  grid();
  pop();
  
  for (let i = 0; i < itemsSlider.value(); i++) {
    push();
    noStroke();
    fill(items[i].color);
    translate(items[i].position);
    let radius = items[i].size / 2;
    i % 3 === 0
      ? box(radius)
      : i % 3 === 1
      ? sphere(radius)
      : torus(radius, radius / 4);
    pop(); 
  }
}
