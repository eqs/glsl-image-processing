#ifdef GL_ES
precision mediump float;
#endif

varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

uniform int blurSize = 13;

void main() {

    vec2 p = vertTexCoord.st;

    vec4 avg = vec4(0.0, 0.0, 0.0, 0.0);
    for (int x = -blurSize / 2; x < blurSize / 2; x++) {
      for (int y = -blurSize / 2; y < blurSize / 2; y++) {
          vec2 offset = vec2(x, y) / u_resolution;
          avg += texture2D(texture, p + offset);
        }
    }

    gl_FragColor = avg / (blurSize * blurSize);
}
