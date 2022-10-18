let zoom = 1;
let drag;
let prevMouse;
let angle = 0;

let sun, space;
let spaceSphereSize;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 4);
}

function setup() {
  drag = createVector(0, 0);
  
  createCanvas(windowWidth, windowHeight - 4, WEBGL);
  createEasyCam();
  
  space = loadImage("sketches/space.jpg");
  
sun = new Body(30, 0, null, loadImage("sketches/sun.jpg"), color(255));
  m = new Body(5, 60, sun, loadImage("sketches/mercury.jpg"));
  v = new Body(8, 120, sun, loadImage("sketches/venus.jpg"));
  e = new Body(9, 190, sun, loadImage("sketches/earth.jpg"));
  new Body(2, 25, e, loadImage("sketches/moon.jpg"));
  r = new Body(7, 260, sun, loadImage("sketches/mars.jpg"));
  new Body(3, 22, r, loadImage("sketches/phobos.jpg"));
  new Body(2, 30, r, loadImage("sketches/deimos.jpg"));
  j = new Body(20, 350, sun, loadImage("sketches/jupiter.jpg"));
  s = new Body(17, 400, sun, loadImage("sketches/saturn.jpg"));
  
  new Body(0, 20, s, loadImage("sketches/phobos.jpg"));
  new Body(0, 21, s, loadImage("sketches/phobos.jpg"));
  new Body(0, 22, s, loadImage("sketches/phobos.jpg"));
  new Body(0, 23, s, loadImage("sketches/phobos.jpg"));
  new Body(0, 24, s, loadImage("sketches/phobos.jpg"));
  new Body(0, 25, s, loadImage("sketches/phobos.jpg"));
  
  u = new Body(13, 450, sun, loadImage("sketches/uranus.jpg"));
  n = new Body(12, 500, sun, loadImage("sketches/neptune.jpg"));
  p = new Body(4, 600, sun, loadImage("sketches/pluto.jpg"));  
}

function draw() {
  background(0);
  
  noStroke();
  ambientMaterial(255);
  //ambientLight(100);
  
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

function Body(radius, distance, parent, tex, emission) {
  this.radius = radius;
  this.distance = distance;
  this.orbitLength = distance * 2 * PI;
  this.angle = random(2 * PI);
  this.tex = tex;
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
    this.angle += (speed / this.orbitLength) * (this.orbitLength/2/2);
  }
  for (let body of this.children) {
    body.update();
  }
}
function mouseClicked(){
      //sphere(24);
      return true
    }
    mouseClicked()
    

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
    
    for (let body of this.children) {
      body.draw();
    }
  }
  pop();
}

// Ref textures: http://planetpixelemporium.com/pluto.html 
// Ref Space: https://svs.gsfc.nasa.gov/3895 