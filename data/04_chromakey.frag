varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

uniform vec3 lowerHSB = vec3( 90.0/180.0, 150.0/255.0, 40.0/255.0);
uniform vec3 upperHSB = vec3(150.0/180.0, 255.0/255.0, 255.0/255.0);

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

float inRange(in vec3 color, in vec3 lower, in vec3 upper) {
    if (lower.r <= color.r && color.r <= upper.r &&
        lower.g <= color.g && color.g <= upper.g &&
        lower.b <= color.b && color.b <= upper.b) {
        return 1.0;
    } else {
        return 0.0;
    }
}

void main() {
    vec2 p = vertTexCoord.st;
    vec4 col = texture2D(texture, p);

    vec3 rgb = vec3(col.r, col.g, col.b);
    vec3 hsb = rgb2hsb(rgb);

    float alpha = 1.0 - inRange(hsb, lowerHSB, upperHSB);

    gl_FragColor = vec4(rgb, alpha);
}