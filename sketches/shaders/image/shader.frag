precision mediump float;

// uniforms are defined and sent by the sketch
uniform int coloring_tool;
uniform sampler2D texture;
varying vec2 texcoords2;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];

uniform bool region;
uniform bool magnifier;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

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

// returns 
vec4 coloringBrightness(vec4 texel){
  
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
  
  return texel;
  
}

vec4 convolutionMask(){
  // 1. Use offset to move along texture space.
  // In this case to find the texcoords of the texel neighbours.
  vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
  vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
  vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
  vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  // origin (current fragment texcoords)
  vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
  vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
  vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
  vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
  vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);
  
  
  // 2. Sample texel neighbours within the rgba array
  vec4 rgba[9];
  rgba[0] = texture2D(texture, tc0);
  rgba[1] = texture2D(texture, tc1);
  rgba[2] = texture2D(texture, tc2);
  rgba[3] = texture2D(texture, tc3);
  rgba[4] = texture2D(texture, tc4);
  rgba[5] = texture2D(texture, tc5);
  rgba[6] = texture2D(texture, tc6);
  rgba[7] = texture2D(texture, tc7);
  rgba[8] = texture2D(texture, tc8);

  // 3. Apply convolution kernel
  vec4 convolution;
  for (int i = 0; i < 9; i++) {
    convolution += rgba[i]*mask[i];
  }
  
  return vec4(convolution.rgb, 1.0); 
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  
  //Shadertoy Code Magnifier
  float R = 100.0;
  float h = 40.0;
  float hr = R * sqrt(1.0 - ((R - h) / R) * ((R - h) / R));
  
  vec2 xy = gl_FragCoord.xy - u_mouse.xy;
  float r = sqrt(xy.x * xy.x + xy.y * xy.y);
  vec2 new_xy = r < hr ? xy * (R - h) / sqrt(R * R - r * r) : xy;
  //
  
  texel = convolutionMask();
  //texel = coloringBrightness(texel);
    
  if (region){
    if(r < hr){
      gl_FragColor = convolutionMask();
      gl_FragColor = coloringBrightness(texel);
    }else{
      gl_FragColor = texture2D(texture, texcoords2);
    }
  } else if (magnifier){
    gl_FragColor = texture2D(texture, (new_xy.xy + u_mouse.xy) / (u_resolution.xy));
  } else {
    gl_FragColor = convolutionMask();
    gl_FragColor = coloringBrightness(texel);
  }
}

// Ref: https://www.shadertoy.com/view/Ms33WX
// Ref: Image: https://pixabay.com/es/photos/rosado-flores-de-cerezo-flores-rama-324175/
// Ref Hojas: https://pixabay.com/es/photos/sale-de-planta-hojas-de-loto-318743/