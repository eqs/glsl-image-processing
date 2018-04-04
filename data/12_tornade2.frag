#define PI 3.14159265358
#define TWO_PI 6.28318530718

varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;
uniform vec2 u_mouse;

const int n_offsets = 6;

mat2 rotate(in float t) {
    return mat2(cos(t), -sin(t),
                sin(t),  cos(t));
}

void main() {

    vec2 p = vertTexCoord.st;

    float r = 100.0;
    for (float k = 0.0; k < float(n_offsets); k++) {
        float t = (TWO_PI / n_offsets * k) + u_time * 3.0;
        vec2 offset = 0.5 * vec2(cos(t), sin(t));
        float d = distance(p, vec2(0.5) + offset);
        r = r > d ? d : r;
    }
    
    int c = int(floor(r * 16.0));
    if (c % 2 == 0) {
        c *= -1;
    }

    // 回転させる
    vec2 q = p;
    q -= vec2(0.5, 0.5);
    q *= rotate((sin(u_time * 0.5) + 1.0) * TWO_PI * c);
    q += vec2(0.5, 0.5);
    vec4 col = texture2D(texture, q);

    gl_FragColor = col;
}