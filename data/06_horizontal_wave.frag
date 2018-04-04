varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;

uniform vec3 colorA = vec3(0.149, 0.141, 0.912);
uniform vec3 colorB = vec3(1.000, 0.833, 0.224);

void main() {

    vec2 p = vertTexCoord.st;

    float f = 0.1*sin(10.0*p.y + 10.0*u_time)
                + 0.12*sin(8.0*p.y + 3.0*u_time);
                + 0.55*sin(30.0*p.y + 30.0*u_time);
    
    vec2 offset = vec2(f, 0.0);
    vec2 coord = p + offset;
    vec4 rgb = vec4(0.0);

    if (0.0 < coord.x && coord.x < 1.0) {
        rgb = texture2D(texture, coord);
    }

    gl_FragColor = rgb;
}