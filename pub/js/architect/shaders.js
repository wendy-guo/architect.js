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
        v_colour = a_colour;

    }`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec3 v_normal;
    varying vec4 v_colour;
    varying float v_lighting;

    uniform vec3 u_reverseLight;
    uniform vec4 u_colour;

    void main() {

        gl_FragColor = v_colour;
        
    }`;

const vertexShaderSourceWithLighting = `
    attribute vec4 a_position;  // position coordinates
    attribute vec3 a_normal;  // normal
    attribute vec4 a_colour;  // colour for each face

    uniform mat4 u_matrix;  // transformation matrix

    varying vec3 v_normal;
    varying vec4 v_colour;

    void main() {
        gl_Position = u_matrix * a_position;
        v_normal = a_normal;
        v_colour = a_colour;
    }`;

const fragmentShaderSourceWithLighting = `
    precision mediump float;

    varying vec3 v_normal;
    varying vec4 v_colour;

    uniform vec3 u_reverseLight;

    void main() {

        //vec3 normal = normalize(v_normal);  // convert to unit vector
        float light = dot(v_normal, u_reverseLight);  // get light direction

        gl_FragColor = v_colour;
        gl_FragColor.rgb *= light + 0.3;

    }`;

export { vertexShaderSource, fragmentShaderSource, vertexShaderSourceWithLighting, fragmentShaderSourceWithLighting };
