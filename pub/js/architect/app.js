import { vertexShaderSource, fragmentShaderSource } from "./architect/shaders.js";
import { degToRad, radToDeg } from "./architect/angles.js";
import { threeD } from "./architect/three-d.js";
import { utils } from "./architect/utils.js";
import { Architect } from "./architect/architect.js";
import { gridWaves } from "./architect/grid-waves.js";

("use strict");
const log = console.log;
log("hello architect ^^");

function main(cv) {

  // ..........................................................
  // get canvas element and webgl context
  const canvas = document.getElementById(cv);
  const gl = Architect.getContext(canvas);

  if (!gl) {
    console.log("no webgl");
    return;
  }

  const program = Architect.getProgram();

  const c1 = [[248, 196, 205],
  [211, 137, 149],
  [211, 137, 149],
  [253, 231, 205],
  [211, 137, 149],
  [248, 196, 205]];


  const grid = new Architect.BlocksGrid(gl, 15, 15, [20, 20, 20], [-50, 150, 0], c1);

  //const stairs = new Stairs(gl, 10, [20, 20, 100], [150, 100, -50]);

  // ........................................................... 
  // initial transformation settings
  let translation = [0, 0, -1000];
  let rotation = [degToRad(30), degToRad(-30), degToRad(0)];
  let scale = [1, 1, 1];
  let fieldOfViewRadians = degToRad(35);
  let cameraRotation = 0;
  let view;
  let angle = 0;

  // ............................................................ 
  // draw scene
  requestAnimationFrame(drawScene); // Setup a ui.

  function drawScene() {

    utils.resetGL(gl);
    gl.useProgram(program);

    updateView();

    let matrix = threeD.transform(view, translation, rotation, scale);

    let offsetR = 0;
    let offsetC = 0;

    for (let r = 0; r < grid.rows; r++) {
      for (let c = 0; c < grid.columns; c++) {
        let block = grid.blocks[r][c];

        let m = threeD.translate(matrix, block.position[0], block.position[1], block.position[2]);
        m = threeD.scale(m, 1, getScaleFactor(angle + offsetR + offsetC), 1, 25);
        block.setMatrix(m);

        utils.setupBufferAttribPointers(gl, block);
        utils.enableAttribUniform(gl, program, block);
        gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)});
        offsetC += 0.2;
      }
      offsetR += 0.2;
    }

    angle += 0.05;
    requestAnimationFrame(drawScene);
  }

  function updateView() {
    let projection = threeD.perspective(fieldOfViewRadians, gl.canvas.clientWidth / gl.canvas.clientHeight, 1, 2000);
    let camera = threeD.yRotationMatrix(cameraRotation);
    camera = threeD.translate(camera, 0, 0, 100);

    view = threeD.inverse(camera);
    view = threeD.matrixMultiply(projection, view);
  }

  function getScaleFactor(angle) {
    let scaleFactor = Math.sin(angle) + 1;  // sin goes from -1 -> 1, changing to 0 -> 2
    scaleFactor *= 4 // 0 -> 8
    scaleFactor += 3;  // 3 -> 11
    return scaleFactor;
  }
}

main("canvas");