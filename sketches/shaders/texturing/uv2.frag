precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;
uniform float colorB;

void main() {
  gl_FragColor = vec4(texcoords2.xy, colorB , opacity);
}