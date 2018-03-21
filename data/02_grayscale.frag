varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

void main() {

    vec2 p = vertTexCoord.st;

    vec4 col = texture2D(texture, p);
    float gray = 0.2989 * col.r + 0.5870 * col.g + 0.1140 * col.b;

    gl_FragColor = vec4(gray, gray, gray, 1.0);
}