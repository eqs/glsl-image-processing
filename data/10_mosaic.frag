varying vec4 vertTexCoord;
uniform sampler2D texture;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_rand;
uniform float u_noise;
uniform vec2 u_mouse;

uniform int nrows = 32;
uniform int ncols = 24;

void main() {

    vec2 p = vertTexCoord.st;

    vec2 pd = vec2(floor(p.x * ncols) / ncols, floor(p.y * nrows) / nrows);

    vec4 col = texture2D(texture, pd);

    gl_FragColor = col;
}