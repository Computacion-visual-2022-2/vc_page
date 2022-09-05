let img;

function preload() {
  img = loadImage('/vc_page/sketches/mandrill.png');
}

function setup() {
  createCanvas(725, 550);
  pixelDensity(1);
  img.loadPixels();
  loadPixels();
}

function draw() {
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      // Calcular la posición 1D de una matriz 2D
      let loc = (x + y * img.width) * 4;
      // Obtener los valores R,G,B de una imagen
      let r, g, b;
      r = img.pixels[loc];
      // Calcular una cantidad a cambiar de brillo basado en la proximidad al ratón
      let maxdist = 80;
      let d = dist(x, y, mouseX, mouseY);
      let adjustbrightness = (255 * (maxdist - d)) / maxdist;
      r += adjustbrightness;
      // Limitar RGB para asegurarse de estar dentro del rango 0-255 de color
      r = constrain(r, 0, 255);
      // Hacer un nuevo color y definir el pixel en la ventana
      //color c = color(r, g, b);
      let pixloc = (y * width + x) * 4;
      pixels[pixloc] = r;
      pixels[pixloc + 1] = r;
      pixels[pixloc + 2] = r;
      pixels[pixloc + 3] = 255;
    }
  }
  updatePixels();
}