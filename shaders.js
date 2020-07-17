const vertexShaderSource = `
    attribute vec4 a_position;  // position coordinates
    attribute vec4 a_color;  // pixel colour

    uniform mat4 u_matrix;  // transformation matrix

    varying vec4 v_color;

    void main() {
        gl_Position = u_matrix * a_position;
        v_color = a_color;
    }`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec4 v_color;

    void main() {
        gl_FragColor = v_color;
    }`;

export { vertexShaderSource, fragmentShaderSource };
