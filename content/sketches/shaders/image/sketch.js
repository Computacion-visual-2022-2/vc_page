let theShader;
let img;
let input;
let select_mask, select_brightness, select_type;
let mask_value = 0;
let region, magnifier;
let coloring_tool = 'None';
let coloring_tool_value = 0;
let vid;
let cam;

function preload() {
  theShader = readShader('/vc_page/sketches/shaders/image/shader.frag',
                        { varyings: Tree.texcoords2 });
  img = loadImage('/vc_page/sketches/shaders/image/hojas.jpg');
  
  vid = createVideo(['/vc_page/sketches/shaders/image/dog.mp4']);
  vid.hide();
}

function setup() {
  createCanvas(700, 500, WEBGL);
  noStroke();
  textureMode(NORMAL);
  shader(theShader);
  
  select_mask = createSelect();
  select_mask.position(20, 15);
  select_mask.style('color', 'black');
  select_mask.option('Identity', 0);
  select_mask.option('Sharpen', 1);
  select_mask.option('Box Blur', 2);
  select_mask.option('Edge Detection', 3);
  select_mask.option('Gaussian', 4);
  select_mask.option('Emboss', 5);  
  select_mask.changed(selectEventMask);
  
  theShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]);
  
  region = createCheckbox('Region', false);
  region.style('color', 'white');
  region.position(150, 15);
  
  magnifier = createCheckbox('Magnifier', false);
  magnifier.style('color', 'white');
  magnifier.position(230, 15);

  select_brightness = createSelect();
  select_brightness.position(330, 15);
  select_brightness.style('color', 'black');
  select_brightness.option('Original', 0);
  select_brightness.option('Component Average', 1);
  select_brightness.option('Luma', 2);
  select_brightness.option('HSV', 3);
  select_brightness.option('HSL', 4);
  select_brightness.changed(selectEventBrightness);
  
  cam = createCapture(VIDEO);
  cam.hide();
  
  select_type = createSelect();
  select_type.position(500, 15);
  select_type.style('color', 'black');
  select_type.option('Imagen', 0);
  select_type.option('Video', 1);
  select_type.option('Camera', 2);
  select_type.changed(selectEventType);
  
  theShader.setUniform('texture', img);
  emitResolution(theShader, 'u_resolution');    
}

function selectEventMask(){
  mask_value = select_mask.value();
  
  switch (mask_value){
      case '0':
        theShader.setUniform('mask', [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0]); 
        break;
      case '1':
        theShader.setUniform('mask', [-1.0, 0.0, -1.0, 0.0, 5.0, 0.0, -1.0, 0.0, -1.0]);
        break;
      case '2':
        theShader.setUniform('mask', [0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111, 0.1111]);
        break;
      case '3':
        theShader.setUniform('mask', [-1.0, -1.0, -1.0, -1.0, 8.0, -1.0, -1.0, -1.0, -1.0]);
        break;
      case '4':
        theShader.setUniform('mask', [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625]); 
        break;
      case '5':
        theShader.setUniform('mask', [-2.0, -1.0, 0.0, -1.0, 1.0, 0.0, 0.0, 1.0, 0.0]); 
        break;
      default:
        console.log(mask_value);
        break;
  }
}

function selectEventBrightness(){
  coloring_tool_value = select_brightness.value();
}

function selectEventType(){
  type_value = select_type.value();
  
  switch (type_value){
    case '0':
      theShader.setUniform('texture', img);
      vid.pause();
      break;
    case '1':
      theShader.setUniform('texture', vid);
      vid.loop();
      break;
    case '2':
      theShader.setUniform('texture', cam);
      vid.pause();
      break; 
    default:
      console.log(type_value);
      break;
  }
}

function draw() {
  background(0);
  
  if (region.checked()) {
    emitMousePosition(theShader, 'u_mouse');
    theShader.setUniform('region', true);
  } else if (magnifier.checked()) {
    emitMousePosition(theShader, 'u_mouse');
    theShader.setUniform('magnifier', true);
  }else{
    theShader.setUniform('region', false);
    theShader.setUniform('magnifier', false);
  }
  
  theShader.setUniform('coloring_tool', coloring_tool_value);
  
  emitTexOffset(theShader, img, 'texOffset');
  
  quad(-width / 2 + 20, -height / 2 + 35, width / 2 - 20, -height / 2 + 35,
        width / 2 - 20, height / 2 - 30, -width / 2 + 20, height / 2 - 30);
}

// Ref: https://p5js.org/es/examples/3d-shader-using-webcam.html