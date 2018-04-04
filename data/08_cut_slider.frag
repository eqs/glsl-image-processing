varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;

float rect(in float t) {
    float s = mod(t, 1.0);
    return 1.0 - step(0.5, s) * 2.0;
}

void main() {

    vec2 p = vertTexCoord.st;

    float c = pow(abs(sin(u_time*1.2 + u_rand)), 30);
    vec2 q = 1.5 * vec2(min(0.1, c)*rect(p.y+u_rand+c), 0.0);
    vec4 col = texture2D(texture, p + q);

    gl_FragColor = col;
}