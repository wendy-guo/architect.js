import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";
import { block, blockColours } from "./block.js";
import { degToRad, radToDeg } from "./angles.js";
import { threeD } from "./three-d.js";

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
    gl.STATIC_DRAW);
  
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(block), gl.STATIC_DRAW);
};

// Fill the buffer with colours for the 'F'.
const setColours = (gl) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Uint8Array(blockColours),
    gl.STATIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array(blockColours), gl.STATIC_DRAW);
};

const resize = (canvas) => {
  if (
    canvas.width != canvas.clientWidth ||
    canvas.height != canvas.clientHeight
  ) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
};

function main() {
  // ..........................................................
  // get canvas element and webgl context
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("trying experimental");
    return;
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
  let translation = [200, 150, 0];
  let rotation = [degToRad(50), degToRad(200), degToRad(100)];
  let scale = [1, 1, 1];

  // ............................................................ 
  // draw scene
  drawScene();

  function drawScene() {

    resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  // clear canvas
    gl.enable(gl.CULL_FACE);  // cull backfacing triangles (default)
    gl.enable(gl.DEPTH_TEST);  // enable depth filter

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionA, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionA);

    gl.bindBuffer(gl.ARRAY_BUFFER, colourBuffer);
    gl.vertexAttribPointer(colourA, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.enableVertexAttribArray(colourA);

    let matrix = threeD.project(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = threeD.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = threeD.rotateX(matrix, rotation[0]);
    matrix = threeD.rotateY(matrix, rotation[1]);
    matrix = threeD.rotateZ(matrix, rotation[2]);
    matrix = threeD.scale(matrix, scale[0], scale[1], scale[2]);
    gl.uniformMatrix4fv(matrixU, false, matrix);

    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)
  }
}

main();
