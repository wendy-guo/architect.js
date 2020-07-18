"use strict";
const log = console.log;

// assuming working with 4x4 matrices for 3d

const threeD = {
  // projects coordinate into 3d clip space and sets origin to top left corner
  project: (w, h, d) => {
    return [2 / w, 0, 0, 0, 0, -2 / h, 0, 0, 0, 0, 2 / d, 0, -1, 1, 0, 1];
  },

  _convertToNestedMatrix: (A, B) => {
      A = [A.slice(0, 4), A.slice(4, 8), A.slice(8, 12), A.slice(12, 16)];
      B = [B.slice(0, 4), B.slice(4, 8), B.slice(8, 12), B.slice(12, 16)];
      return [A, B];
    },

  // returns the product of two 4x4 matrices
  matrixMultiply: (A, B) => {
    [A, B] = threeD._convertToNestedMatrix(A, B);
    let C = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        C.push(B[r][0] * A[0][c] + B[r][1] * A[1][c] + B[r][2] * A[2][c] + B[r][3] * A[3][c]);
      }
    }

    return C;
  },

  transform: (matrix, translation, rotation, scaling) => {
    matrix = threeD.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = threeD.rotateX(matrix, rotation[0]);
    matrix = threeD.rotateY(matrix, rotation[1]);
    matrix = threeD.rotateZ(matrix, rotation[2]);
    return threeD.scale(matrix, scaling[0], scaling[1], scaling[2]);
  },

  translate: (matrix, tx, ty, tz) => {
    let translation = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1,
    ];

    return threeD.matrixMultiply(matrix, translation);
  },

  rotateX: (matrix, angle_rad) => {
    let c = Math.cos(angle_rad);
    let s = Math.sin(angle_rad);
    let rotation = [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];

    return threeD.matrixMultiply(matrix, rotation);
  },

  rotateY: (matrix, angle_rad) => {
    let c = Math.cos(angle_rad);
    let s = Math.sin(angle_rad);
    let rotation = [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];

    return threeD.matrixMultiply(matrix, rotation);
  },

  rotateZ: (matrix, angle_rad) => {
    let c = Math.cos(angle_rad);
    let s = Math.sin(angle_rad);
    let rotation = [
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];

    return threeD.matrixMultiply(matrix, rotation);
  },

  scale: (matrix, sx, sy, sz) => {
    let scaling = [
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ];

    return threeD.matrixMultiply(matrix, scaling);
  }
}

export { threeD };