varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;

void main() {

    vec2 p = vertTexCoord.st;

    vec4 col = texture2D(texture, p);
    vec4 col1 = texture2D(texture, vec2( 0.4*u_noise+p.x,   p.y));
    vec4 col2 = texture2D(texture, vec2(-0.4*u_noise+p.x, p.y));

    col.r = col1.r * u_rand + col2.r * (1.0 - u_rand);
    col.g = 0.0;

    gl_FragColor = col;
}