import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";
import { block, blockColours } from "./block.js";
import { degToRad, radToDeg } from "./angles.js";

("use strict");
const log = console.log;

// initialize functions -----------------------------------------------------------------------------------
const createShader = (gl, type, source) => {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader; // success
  }
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const setupProgram = (gl, vertexShaderSource, fragmentShaderSource) => {
  let program = gl.createProgram();
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = createShader(
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
};

const setGeometry = (gl) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(block),
    gl.STATIC_DRAW
  );
};

// Fill the buffer with colours for the 'F'.
const setColours = (gl) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(blockColours),
    gl.STATIC_DRAW);
};

function main() {
  // ..........................................................
  // get canvas element and webgl context
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("trying experimental");
  }

  // ...........................................................
  // create program with shaders
  let program = setupProgram(gl, vertexShaderSource, fragmentShaderSource);

  // ............................................................
  // lookup attributes, uniforms, and varyings
  let positionA = gl.getAttribLocation(program, "a_position");
  let colourA = gl.getAttribLocation(program, "a_colour");

  let matrixU = gl.getUniformLocation(program, "u_matrix");

  // ...........................................................
  // create buffers
  let positionBuffer = gl.createBuffer();
  let colourBuffer = gl.createBuffer();

  // ..........................................................
  // fill buffers with data
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
  setColours(gl);

  // ........................................................... 
  // initial transformation settings
  let translation = [45, 150, 0];
  let rotation = [degToRad(40), degToRad(25), degToRad(325)];
  let scale = [1, 1, 1];

  // ............................................................ 
  // draw scene
  drawScene();

  function drawScene() {
    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionA, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionA);

    gl.useProgram(program);
  }
}

main();
