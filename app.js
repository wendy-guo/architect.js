import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";
import { degToRad, radToDeg } from "./angles.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";
import { Block } from "./block.js";

("use strict");
const log = console.log;

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
  let program = utils.setupProgram(gl, vertexShaderSource, fragmentShaderSource);

  // ............................................................
  // lookup attributes, uniforms, and varyings
  let matrixU = gl.getUniformLocation(program, "u_matrix");

  // ............................................................ 
  // create block objects
  const block = new Block(gl, 50);
  utils.setupBufferAttribPointers(gl, block);

  const moreBlocks = [];
  for (let i = 0; i < 3; i++) {
    let b = new Block(gl, 40);
    utils.setupBufferAttribPointers(gl, b);
    moreBlocks.push(b);
  }

  // ........................................................... 
  // initial transformation settings
  let translation = [200, 150, 0];
  let rotation = [degToRad(50), degToRad(200), degToRad(100)];
  let scale = [1, 1, 1];

  // ............................................................ 
  // draw scene
  drawScene();

  function drawScene() {

    utils.resize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    utils.setSettings(gl);

    gl.useProgram(program);

    utils.enableBufferAttribPointers(gl, program, block);

    let matrix = threeD.project(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
    matrix = threeD.transform(matrix, translation, rotation, scale);
    gl.uniformMatrix4fv(matrixU, false, matrix);

    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)

    for (let i = 0; i < 3; i++){
      matrix = threeD.translate(matrix, 50, 50, 0);
      gl.uniformMatrix4fv(matrixU, false, matrix);

      utils.enableBufferAttribPointers(gl, program, moreBlocks[i]);
      gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)
    }
  }
}

main();