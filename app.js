import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";

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
}

main();
