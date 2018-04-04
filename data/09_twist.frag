varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;

void main() {

    vec2 p = vertTexCoord.st;

    float c = pow(abs(sin(u_time*1.7 + u_rand)), 25);
    float x = 0.7 * (u_noise*u_noise+u_noise - 0.5) * cos(5.0*p.y + u_noise + u_time);
    float y = 1.2 * (u_noise - 0.5) * sin(10.0*p.x + u_time);
    vec2 q = vec2(x, y);
    vec4 col = texture2D(texture, p + c * q);

    gl_FragColor = col;
}