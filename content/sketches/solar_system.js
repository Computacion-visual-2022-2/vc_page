let zoom = 1;
let drag;
let prevMouse;
let angle = 0;

let sun, space;
let spaceSphereSize;
let inconsolata;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}

function preload(){
  space = loadImage("/vc_page/sketches/w2/space.jpg");
  inconsolata = loadFont('/vc_page/sketches/w2/Inconsolata.ttf');
}

function setup() {
  drag = createVector(0, 0);
  
  createCanvas(windowWidth, windowHeight - 4, WEBGL);
  createEasyCam();
  
  sun = new Body(30, 0, null, loadImage("/vc_page/sketches/w2/sun.jpg"), "Sun", color(255));
  m = new Body(5, 60, sun, loadImage("/vc_page/sketches/w2/mercury.jpg"), "Mercury");
  v = new Body(8, 120, sun, loadImage("/vc_page/sketches/w2/venus.jpg"), "Venus");
  e = new Body(9, 190, sun, loadImage("/vc_page/sketches/w2/earth.jpg"), "Earth");
  new Body(2, 25, e, loadImage("/vc_page/sketches/w2/moon.jpg"), "Moon");
  r = new Body(7, 260, sun, loadImage("/vc_page/sketches/w2/mars.jpg"), "Mars");
  new Body(3, 22, r, loadImage("/vc_page/sketches/w2/phobos.jpg"), "Phobos");
  new Body(2, 30, r, loadImage("/vc_page/sketches/w2/deimos.jpg"), "Deimos");
  j = new Body(20, 350, sun, loadImage("/vc_page/sketches/w2/jupiter.jpg"), "Jupiter");
  s = new Body(17, 400, sun, loadImage("/vc_page/sketches/w2/saturn.jpg"), "Saturn");
  
  u = new Body(13, 450, sun, loadImage("/vc_page/sketches/w2/uranus.jpg"), "Uranus");
  n = new Body(12, 500, sun, loadImage("/vc_page/sketches/w2/neptune.jpg"), "Neptune");
  p = new Body(4, 600, sun, loadImage("/vc_page/sketches/w2/pluto.jpg"), "Pluto");  


  textFont(inconsolata);
  textSize(9);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);
  
  noStroke();
  //ambientMaterial(255);
  ambientLight(100);
  
  spaceSphereSize = width > height ? width : height;
  
  push();
  noStroke();
  texture(space);
  translate(0, 0, 0);
  rotateY(millis() / (10000 * 2));
  sphere(spaceSphereSize + 700);
  pop();
  
  //rotateX(PI/2);

  sun.update();
  sun.draw();
  angle += 0.02;
}

function mousePressed() {
  prevMouse = createVector(mouseX, mouseY);
}

// function mouseDragged() {
//   let mousePos = createVector(mouseX, mouseY);
//   drag.add(mousePos.copy().sub(prevMouse));
//   prevMouse = mousePos.copy();
  
//   return false;
// }

function mouseWheel(event) {
  zoom += event.delta * 0.0005;
}

//****************************************
// BODY

function Body(radius, distance, parent, tex, name, emission) {
  this.radius = radius;
  this.distance = distance;
  this.orbitLength = distance * 2 * PI;
  this.angle = random(2 * PI);
  this.tex = tex;
  this.name = name;
  this.emission = emission;
  this.children = [];
  this.parent = parent;
  if (parent) {
    parent.children.push(this);
  }
}

Body.prototype.update = function() {
  if (this.orbitLength > 0) {
    let speed = pow((width - this.distance) * 0.01 / (width), 0.5);
    this.angle += (speed / this.orbitLength) * (this.orbitLength/2/2/2);
  }
  for (let body of this.children) {
    body.update();
  }
}

Body.prototype.draw = function() {
  push();
  {
    push();
    {
      strokeWeight(0.30);
      stroke(120);//40
      noFill();
      rotateX(1.57);
      ellipse(0, 0, this.distance * 2 );
    }
    pop();
    
    if (this.emission) {
      //fill(this.emission);
      //scale(100);
      
      pointLight(255, 255, 255, 30, 30, 30);
      pointLight(255, 255, 255, 30, -30, -30);
      pointLight(255, 255, 255, -30, -30, -30);
      pointLight(255, 255, 255, -30, -30, 30);
      pointLight(255, 255, 255, -30, 30, 30);
      pointLight(255, 255, 255, 30, -30, 30);
    }
    
    rotateY(-this.angle);
    translate(this.distance, 0);
    
    rotateY(millis()/10000);
    if (this.emission) {
      ambientLight(120);
    }
    
    texture(this.tex);

    sphere(this.radius);
    text(this.name, 0, this.radius + 5);

    for (let body of this.children) {
      body.draw();
    }
  }
  pop();
}

// Ref textures: http://planetpixelemporium.com/planets.html 
// Ref Space: https://svs.gsfc.nasa.gov/3895 