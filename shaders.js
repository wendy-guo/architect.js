const vertexShaderSource = `
    attribute vec4 a_position;  // position coordinates
    attribute vec4 a_colour;  // pixel colour

    uniform mat4 u_matrix;  // transformation matrix

    varying vec4 v_colour;

    void main() {
        gl_Position = u_matrix * a_position;
        v_colour = a_colour;
    }`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec4 v_colour;

    void main() {
        gl_FragColor = v_colour;
    }`;

export { vertexShaderSource, fragmentShaderSource };
