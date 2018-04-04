#define PI 3.14159265358
#define TWO_PI 6.28318530718

varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;
uniform vec2 u_mouse;

mat2 rotate(in float t) {
    return mat2(cos(t), -sin(t),
                sin(t),  cos(t));
}

void main() {

    vec2 p = vertTexCoord.st;

    float r = length(p - vec2(0.5, 0.5));
    float c = 0.1 * sin(r * 15.0 - u_time * 5.0);

    // c = c * step(r, 0.4);
    float skewr = 0.4;
    c = c * (1.0 - smoothstep(skewr-0.05, skewr+0.05, r));

    // 回転させる
    vec2 q = p;
    q -= vec2(0.5, 0.5);
    q *= rotate(c * TWO_PI);
    q += vec2(0.5, 0.5);

    vec4 col = texture2D(texture, q);

    gl_FragColor = col;
}