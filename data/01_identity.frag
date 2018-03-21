varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 p = vertTexCoord.st;
    gl_FragColor = texture2D(texture, p);
}