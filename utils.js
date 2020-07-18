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

        gl.bindBuffer(gl.ARRAY_BUFFER, block.positionBuffer);
        utils._setGeometry(gl, block.geometry);

        gl.bindBuffer(gl.ARRAY_BUFFER, block.colourBuffer);
        utils._setColours(gl, block.colours);

    },

    enableBufferAttribPointers: (gl, program, block) => {
        let positionA = gl.getAttribLocation(program, "a_position");
        let colourA = gl.getAttribLocation(program, "a_colour");

        gl.bindBuffer(gl.ARRAY_BUFFER, block.positionBuffer);
        gl.vertexAttribPointer(positionA, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionA);

        gl.bindBuffer(gl.ARRAY_BUFFER, block.colourBuffer);
        gl.vertexAttribPointer(colourA, 3, gl.UNSIGNED_BYTE, true, 0, 0);
        gl.enableVertexAttribArray(colourA);

        console.log("enabled buffers");

    },

    setSettings: (gl) => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // clear canvas
        gl.enable(gl.CULL_FACE);  // cull backfacing triangles (default)
        gl.enable(gl.DEPTH_TEST);  // enable depth filter
    }
};

export { utils };