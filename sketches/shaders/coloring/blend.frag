precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

uniform int blendType;

vec4 multiplyMode(){
  return brightness * uMaterial1 * uMaterial2;
}

vec4 addMode(){
  return brightness * (uMaterial1 + uMaterial2);
}

vec4 darkestMode(){
  return brightness * min(uMaterial1, uMaterial2);
}

vec4 lightestMode(){
  return brightness * max(uMaterial1, uMaterial2);
}

vec4 differenceMode(){
  return brightness * (uMaterial1 - uMaterial2);
}

void main() {
  if (blendType == 0){
    gl_FragColor = multiplyMode();
  } else if (blendType == 1) {
    gl_FragColor = addMode();
  } else if (blendType == 2) {
    gl_FragColor = darkestMode();
  }else if (blendType == 3){
    gl_FragColor = lightestMode();
  }else{
    gl_FragColor = differenceMode();
  } 
}