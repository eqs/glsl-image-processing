varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

uniform vec3 colorA = vec3(0.149, 0.141, 0.912);
uniform vec3 colorB = vec3(1.000, 0.833, 0.224);

void main() {

    vec2 p = vertTexCoord.st;

    vec4 col = texture2D(texture, p);
    float gray = 0.2989 * col.r + 0.5870 * col.g + 0.1140 * col.b;

    vec3 rgb = mix(colorA, colorB, gray);

    gl_FragColor = vec4(rgb, 1.0);
}