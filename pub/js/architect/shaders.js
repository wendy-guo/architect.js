const vertexShaderSource = `
    attribute vec4 a_position;  // position coordinates
    attribute vec3 a_normal;  // normal
    attribute vec4 a_colour;  // colour for each face
    attribute float a_lighting;  // lighting (used as boolean)

    uniform mat4 u_matrix;  // transformation matrix

    varying vec3 v_normal;
    varying vec4 v_colour;
    varying float v_lighting;

    void main() {
        gl_Position = u_matrix * a_position;
        if (a_lighting > 0.5) {
            v_normal = a_normal;
        } else {
            v_colour = a_colour;
        }
        v_lighting = a_lighting;
    }`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec3 v_normal;
    varying vec4 v_colour;
    varying float v_lighting;

    uniform vec3 u_reverseLight;
    uniform vec4 u_colour;

    void main() {

        if (v_lighting > 0.5) {
            vec3 normal = normalize(v_normal);  // convert to unit vector
            float light = dot(normal, u_reverseLight);  // get light direction

            gl_FragColor = u_colour;
            gl_FragColor.rgb *= light;
        } else {
            gl_FragColor = v_colour;
        }
    }`;

const vertexShaderSourceWithLighting = `
    attribute vec4 a_position;  // position coordinates
    attribute vec3 a_normal;  // normal
    attribute vec4 a_colour;  // colour for each face
    attribute float a_lighting;  // lighting (used as boolean)

    uniform mat4 u_matrix;  // transformation matrix

    varying vec3 v_normal;
    varying vec4 v_colour;
    varying float v_lighting;

    void main() {
        gl_Position = u_matrix * a_position;
        if (a_lighting > 0.5) {
            v_normal = a_normal;
        } else {
            v_colour = a_colour;
        }
        v_lighting = a_lighting;
    }`;

const fragmentShaderSourceWithLighting = `
    precision mediump float;

    varying vec3 v_normal;
    varying vec4 v_colour;
    varying float v_lighting;

    uniform vec3 u_reverseLight;
    uniform vec4 u_colour;

    void main() {

        if (v_lighting > 0.5) {
            vec3 normal = normalize(v_normal);  // convert to unit vector
            float light = dot(normal, u_reverseLight);  // get light direction

            gl_FragColor = u_colour;
            gl_FragColor.rgb *= light;
        } else {
            gl_FragColor = v_colour;
        }
    }`;

export { vertexShaderSource, fragmentShaderSource, vertexShaderSourceWithLighting, fragmentShaderSourceWithLighting };
