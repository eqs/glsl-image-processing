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
    int c = int(floor(r * 15.0));
    if (c % 2 == 0) {
        c *= -1;
    }

    // 回転させる
    vec2 q = p;
    q -= vec2(0.5, 0.5);
    q *= rotate(u_time * c * 0.5);
    q += vec2(0.5, 0.5);

    vec4 col = texture2D(texture, q);

    gl_FragColor = col;
}