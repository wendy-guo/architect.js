const vertexShaderSource = `
    attribute vec4 a_position;  // position coordinates
    attribute vec3 a_normal;  // normal

    uniform mat4 u_matrix;  // transformation matrix

    varying vec3 v_normal;

    void main() {
        gl_Position = u_matrix * a_position;
        v_normal = a_normal;
    }`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec3 v_normal;

    uniform vec3 u_reverseLight;
    uniform vec4 u_colour;

    void main() {
        vec3 normal = normalize(v_normal);  // convert to unit vector
        float light = dot(normal, u_reverseLight);  // get light direction

        gl_FragColor = u_colour;
        gl_FragColor.rgb *= light;
    }`;

export { vertexShaderSource, fragmentShaderSource };
