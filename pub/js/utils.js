import { threeD } from "./three-d.js";

const utils = {
    _createShader: (gl, type, source) => {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader; // success
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    },
    
    _setGeometry: (gl, geometry) => {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(geometry),
            gl.STATIC_DRAW);
    },

    _setNormals: (gl, normals) => {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(normals),
            gl.STATIC_DRAW);
    },

    _setColours: (gl, colours) => {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Uint8Array(colours),
            gl.STATIC_DRAW);
    },

    setupProgram: (gl, vertexShaderSource, fragmentShaderSource) => {
        let program = gl.createProgram();
        let vertexShader = utils._createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = utils._createShader(
            gl,
            gl.FRAGMENT_SHADER,
            fragmentShaderSource
        );

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return program; // success
        }
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    },

    resize: (canvas) => {
        if (
            canvas.width != canvas.clientWidth ||
            canvas.height != canvas.clientHeight
        ) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        }
    },

    setupBufferAttribPointers: (gl, block) => {

        gl.bindBuffer(gl.ARRAY_BUFFER, block.getPositionBuffer());
        utils._setGeometry(gl, block.getGeometry());

        if (block.getLighting > 0.5) {
            gl.bindBuffer(gl.ARRAY_BUFFER, block.getNormalBuffer());
            utils._setNormals(gl, block.getNormals());
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, block.getColourBuffer());
            utils._setColours(gl, block.getColours());
        }
    },

    enableAttribUniform: (gl, program, block) => {
        let positionA = gl.getAttribLocation(program, "a_position");
        let normalA = gl.getAttribLocation(program, "a_normal");
        let colourA = gl.getAttribLocation(program, "a_colour");
        let lightingA = gl.getAttribLocation(program, "a_lighting");

        let matrixU = gl.getUniformLocation(program, "u_matrix");
        let colourU = gl.getUniformLocation(program, "u_colour");
        let reverseLightU = gl.getUniformLocation(program, "u_reverseLight");

        gl.bindBuffer(gl.ARRAY_BUFFER, block.getPositionBuffer());
        gl.vertexAttribPointer(positionA, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionA);

        gl.uniformMatrix4fv(matrixU, false, block.getMatrix());

        /** 
        if (block.getLighting() > 0.5){
            gl.bindBuffer(gl.ARRAY_BUFFER, block.getNormalBuffer());
            gl.vertexAttribPointer(normalA, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(normalA);

            gl.uniform4fv(colourU, block.getColour());
            gl.uniform3fv(reverseLightU, threeD.normalize([1.2, 1.1, 1]));
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, block.getColourBuffer());
            gl.vertexAttribPointer(colourA, 3, gl.UNSIGNED_BYTE, true, 0, 0);
            gl.enableVertexAttribArray(colourA);
        } */

        gl.bindBuffer(gl.ARRAY_BUFFER, block.getColourBuffer());
        gl.vertexAttribPointer(colourA, 3, gl.UNSIGNED_BYTE, true, 0, 0);
        gl.enableVertexAttribArray(colourA);
    },

    setSettings: (gl) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // clear canvas
        gl.enable(gl.CULL_FACE);  // cull backfacing triangles (default)
        gl.enable(gl.DEPTH_TEST);  // enable depth filter
    },

    resetGL: (gl) => {
        utils.resize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        utils.setSettings(gl);
    }
};

export { utils };