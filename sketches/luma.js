let img;
function preload() {
    img = loadImage('/vc_page/sketches/mandrill.png');
}

function setup() {
    var canvas = createCanvas(550, 550);
    textAlign(LEFT, TOP);
    fill(255);
}

function draw() {
    image(img, 0, 0);
    loadPixels();
    for (let j = 0; j < 550; j++) {
        for (let i = 0; i < Math.max(Math.min(mouseX, 600), 0); i++) {
            index = 4 * ((j) * 550 + (i));
            let c = (0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2]);
            pixels[index] = c;
            pixels[index + 1] = c;
            pixels[index + 2] = c;
        }
    }
    updatePixels();
    //text(frameRate().toFixed(3), 0, 0);
}