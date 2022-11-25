precision mediump float;

// uniforms are defined and sent by the sketch
uniform int coloring_tool;
uniform sampler2D texture;
varying vec2 texcoords2;

// returns component average of given texel
float avg(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

// returns hsv of given texel
float hsv(vec3 texel) {
  return max(max(texel.r, texel.b), max(texel.r,texel.g));
}

// returns hsl of given texel
float hsl(vec3 texel){
  float maxColor = max(max(texel.r, texel.g), texel.b);
  float minColor = min(min(texel.r, texel.g), texel.b);
  return (maxColor + minColor)/2.0;
}


void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  
  if (coloring_tool == 0){
    texel = texel;
  }else if (coloring_tool == 1){
    texel = vec4((vec3(avg(texel.rgb))), 1.0);
  }else if (coloring_tool == 2){
    texel = vec4((vec3(luma(texel.rgb))), 1.0);
  }else if (coloring_tool == 3){
    texel = vec4((vec3(hsv(texel.rgb))), 1.0);
  }else if (coloring_tool == 4){
    texel = vec4((vec3(hsl(texel.rgb))), 1.0);
  }
  gl_FragColor = texel;
  
  //gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}