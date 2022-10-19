# Coordinate Spaces

# 3D Application

## Problem Statement
Implement a 3d webgl application. The p5.treegl or any other libraries may be used.

## Background

## Solar System

The solar system is a planetary system located in the Milky Way galaxy, and its center is a star we call the Sun. Around its mass, nine planets, 60 satellites and countless asteroids and comets revolve. Of those planets seven have satellites.

The Sun drags the joint rotation of all the stars of the system in its direction, because it concentrates 99% of the joint mass. The orbits that describe the planets around the Sun are ellipse-shaped, and can be defined from their 'eccentricity' and 'inclination'.

The first indicates how far the orbits of the planets are from the center around which they revolve, that is, the Sun. And the second shows the angle of inclination at which each planet rotates with respect to the Earth's orbit.

![Solar](https://concepto.de/wp-content/uploads/2018/02/Sistema-solar-e1518703607625.jpg)

The closest star to the Sun, Mercury, and the farthest, Pluto, are those with the most 'inclined' orbit.
The closest planets to the Sun: Mercury, Venus, Earth, Mars; and the furthest: Jupiter, Saturn, Uranus and Neptune.

The former have a density greater than 3 grams per cubic centimeter, making them rocky, while the latter have primarily gaseous masses, with less than two grams per cubic centimeter.


## WEBGL

In p5.js, there are two render modes: P2D (default renderer) and WEBGL. Both render modes utilize the html canvas element, however by enabling the WEBGL "context" on the canvas, we can now draw in both 2D and 3D. To enable WEBGL, simply specify as the third parameter in the createCanvas() function.

<pre><code>function setup() {
  createCanvas(200, 200, WEBGL);
}
</code></pre>

## 3D coordinate system

The Cartesian coordinate 0,0 (x,y) is located in the upper left corner of the drawing canvas. In WEBGL mode a third dimension is introduced: Z.

The z dimension is the axis pointing towards you from the screen. is the "left-handed" rule. Point your left index finger to the right and your middle finger down, and your thumb will automatically point towards you. The direction in which the fingers point is assigned exactly to the axes. The point 0,0,0 (x,y,z) is in the middle of the canvas.

![Dimension](https://upload.wikimedia.org/wikipedia/commons/2/2c/3D_coordinate_system.svg)

<pre><code>function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
</code></pre>

## 3D Primitives Shapes

There are 7 different 3D geometry primitives in p5.js.

<pre><code>box()
plane()
sphere()
ellipsoid()
cone()
cylinder()
torus() 
</code></pre>

![Light](https://content.instructables.com/ORIG/FCV/THNI/IRPPNQ1X/FCVTHNIIRPPNQ1X.png?auto=webp&fit=bounds&frame=1&width=1024)

## Translate, Rotate
Calling translate(x,y,z) applies a transformation to the Model Matrix. This is a technical way to move the origin coordinate of the drawing. for example the following code:

<pre><code>function draw(){
  background(255);
  sphere();
  translate(100,100,-100);
  sphere();
}
</code></pre>
This code draws a sphere, then translates our model matrix 100 units to the right, 100 units down, and 100 units away from the viewer, and finally draws another sphere at the new translated origin. 

Another type of model matrix transformation in 3D is rotate(). There are 4 different rotation functions in WEBGL mode:

<pre><code>rotate(angle, [x,y,z]);
rotateX(angle);
rotateY(angle);
rotateZ(angle);
</code></pre>

![rotate](https://help.autodesk.com/cloudhelp/2015/ENU/3DSMax/images/GUID-825CCA0B-7DFA-428F-9117-CC5B6BA62FF0.png)



## Textures

p5.js supports video, image, and offscreen 2d renderers as textures in WEBGL mode. A texture is like a “skin” that wraps around a 3D geometry. For example, if you want a static image to “texture” a sphere, you would write something like this:

<pre><code>let img;
function preload(){
  img = loadImage(“path/to/img.jpg”);
}
function setup(){
  createCanvas(500,500,WEBGL);
}
function draw(){
  background(255);
  texture(img);
  sphere(45);
}
</code></pre>

![Texture](https://img.freepik.com/free-vector/earth-planet-transparent-with-earth-texture-map_1308-60076.jpg?w=2000)

## webgl text()

The webgl version of the text() method works very similarly to the 2d version. However there are a few differences:

### Disadvantages:

* You can only use use opentype/truetype fonts loaded in your preload() function using the loadFont() method. You must either place those font files in a location accessible from your sketch, or use a CORS-compatible webl URL.
* stroke() is not currently supported.

### Advantages:

* The fidelity of the rendered text should be better, especially when zooming & tilting.
* The performance may be better, especially if the text changes regularly and you are unable to cache the offscreen image used in the previous method.

<pre><code>let myFont;
function preload() {
  myFont = loadFont('assets/AvenirNextLTPro-Demi.otf');
}

function setup() {
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  text('p5*js', 10, 50);
}
</code></pre>

## Lights

In WEBGL mode is lights. Lighting is a simple but powerful way to provide depth and realism to p5.js sketches. Are 3 types of light functions in p5.js:

<pre><code>ambientLight();
directionalLight();
pointLight();
</code></pre>

<pre><code>ambientLight(255,0,0); 
sphere(25);
</code></pre>

![Light](https://cdn.knowww.eu/59b8e93cd54a862e9d7e4049//OnEsdqowGmpH.png)

ambientLight() is the simplest of the three functions, and it provides even (omnidirectional) ambient lighting to objects drawn afterward. It takes a p5.Color or r,g,b numerical values as parameters.

## Camera and view

### p5.EasyCam
A p5.js library for easy 3D camera control.

This library is a derivative of the original PeasyCam Library by Jonathan Feinberg and combines new useful features with the great look and feel of the original version.

![camera](https://diwi.github.io/p5.EasyCam/screenshots/RandomBoxes_crop.jpg)


## Code

{{< details title="Code Solar System" open=false >}}
{{< highlight html >}}

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

{{< /highlight >}}
{{< /details >}}

{{<p5-iframe sketch="/vc_page/sketches/solar_system.js" lib1="https://freshfork.github.io/p5.EasyCam/p5.easycam.js" width="750" height="600">}}

## Conclusions

### References
* http://planetpixelemporium.com/planets.html
* https://svs.gsfc.nasa.gov/3895 
* https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5
* https://diwi.github.io/p5.EasyCam/