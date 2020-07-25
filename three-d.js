"use strict";
const log = console.log;

// assuming working with 4x4 matrices for 3d

const threeD = {
  // projects coordinate into 3d clip space and sets origin to top left corner
  identity: [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],

  perspective: (fieldOfViewInRadians, aspect, near, far) => {
    let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    let rangeInv = 1.0 / (near - far);

    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  },

  projection: (width, height, depth) => {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },

  _convertToNestedMatrix: (M) => {
      M = [M.slice(0, 4), M.slice(4, 8), M.slice(8, 12), M.slice(12, 16)];
      return M;
    },

  // returns the product of two 4x4 matrices
  matrixMultiply: (A, B) => {
    A = threeD._convertToNestedMatrix(A);
    B = threeD._convertToNestedMatrix(B);
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
    return threeD.scale(matrix, scaling[0], scaling[1], scaling[2], 0);
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

  yRotationMatrix: (angle_rad) => {
    let c = Math.cos(angle_rad);
    let s = Math.sin(angle_rad);
    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
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

  scale: (matrix, sx, sy, sz, length) => {
    let scaling = [
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ];
    scaling = threeD.matrixMultiply(matrix, scaling);

    if (length != 0){
      return threeD.translate(scaling, 0, -length/2, 0); // scaling from center
      // return threeD.translate(scaling, 0, -length, 0);  // scaling from top
    }

    return scaling;  // scaling from bottom
  },

  inverse: (m) => {
    m = threeD._convertToNestedMatrix(m);
    let tp_0 = m[2][2] * m[3][3]
    let tp_1 = m[3][2] * m[2][3];
    let tp_2 = m[1][2] * m[3][3];
    let tp_3 = m[3][2] * m[1][3];
    let tp_4 = m[1][2] * m[2][3];
    let tp_5 = m[2][2] * m[1][3];
    let tp_6 = m[0][2] * m[3][3];
    let tp_7 = m[3][2] * m[0][3];
    let tp_8 = m[0][2] * m[2][3];
    let tp_9 = m[2][2] * m[0][3];
    let tp_10 = m[0][2] * m[1][3];
    let tp_11 = m[1][2] * m[0][3];
    let tp_12 = m[2][0] * m[3][1];
    let tp_13 = m[3][0] * m[2][1];
    let tp_14 = m[1][0] * m[3][1];
    let tp_15 = m[3][0] * m[1][1];
    let tp_16 = m[1][0] * m[2][1];
    let tp_17 = m[2][0] * m[1][1];
    let tp_18 = m[0][0] * m[3][1];
    let tp_19 = m[3][0] * m[0][1];
    let tp_20 = m[0][0] * m[2][1];
    let tp_21 = m[2][0] * m[0][1];
    let tp_22 = m[0][0] * m[1][1];
    let tp_23 = m[1][0] * m[0][1];

    let t0 = ((tp_0 * m[1][1] + tp_3 * m[2][1] + tp_4 * m[3][1]) -
      (tp_1 * m[1][1] + tp_2 * m[2][1] + tp_5 * m[3][1]));
    let t1 = (tp_1 * m[0][1] + tp_6 * m[2][1] + tp_9 * m[3][1]) -
      (tp_0 * m[0][1] + tp_7 * m[2][1] + tp_8 * m[3][1]);
    let t2 = (tp_2 * m[0][1] + tp_7 * m[1][1] + tp_10 * m[3][1]) -
      (tp_3 * m[0][1] + tp_6 * m[1][1] + tp_11 * m[3][1]);
    let t3 = (tp_5 * m[0][1] + tp_8 * m[1][1] + tp_11 * m[2][1]) -
      (tp_4 * m[0][1] + tp_9 * m[1][1] + tp_10 * m[2][1]);

    let d = 1.0 / (m[0][0] * t0 + m[1][0] * t1 + m[2][0] * t2 + m[3][0] * t3);

    return [
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d * ((tp_1 * m[1][0] + tp_2 * m[2][0] + tp_5 * m[3][0]) -
        (tp_0 * m[1][0] + tp_3 * m[2][0] + tp_4 * m[3][0])),
      d * ((tp_0 * m[0][0] + tp_7 * m[2][0] + tp_8 * m[3][0]) -
        (tp_1 * m[0][0] + tp_6 * m[2][0] + tp_9 * m[3][0])),
      d * ((tp_3 * m[0][0] + tp_6 * m[1][0] + tp_11 * m[3][0]) -
        (tp_2 * m[0][0] + tp_7 * m[1][0] + tp_10 * m[3][0])),
      d * ((tp_4 * m[0][0] + tp_9 * m[1][0] + tp_10 * m[2][0]) -
        (tp_5 * m[0][0] + tp_8 * m[1][0] + tp_11 * m[2][0])),
      d * ((tp_12 * m[1][3] + tp_15 * m[2][3] + tp_16 * m[3][3]) -
        (tp_13 * m[1][3] + tp_14 * m[2][3] + tp_17 * m[3][3])),
      d * ((tp_13 * m[0][3] + tp_18 * m[2][3] + tp_21 * m[3][3]) -
        (tp_12 * m[0][3] + tp_19 * m[2][3] + tp_20 * m[3][3])),
      d * ((tp_14 * m[0][3] + tp_19 * m[1][3] + tp_22 * m[3][3]) -
        (tp_15 * m[0][3] + tp_18 * m[1][3] + tp_23 * m[3][3])),
      d * ((tp_17 * m[0][3] + tp_20 * m[1][3] + tp_23 * m[2][3]) -
        (tp_16 * m[0][3] + tp_21 * m[1][3] + tp_22 * m[2][3])),
      d * ((tp_14 * m[2][2] + tp_17 * m[3][2] + tp_13 * m[1][2]) -
        (tp_16 * m[3][2] + tp_12 * m[1][2] + tp_15 * m[2][2])),
      d * ((tp_20 * m[3][2] + tp_12 * m[0][2] + tp_19 * m[2][2]) -
        (tp_18 * m[2][2] + tp_21 * m[3][2] + tp_13 * m[0][2])),
      d * ((tp_18 * m[1][2] + tp_23 * m[3][2] + tp_15 * m[0][2]) -
        (tp_22 * m[3][2] + tp_14 * m[0][2] + tp_19 * m[1][2])),
      d * ((tp_22 * m[2][2] + tp_16 * m[0][2] + tp_21 * m[1][2]) -
        (tp_20 * m[1][2] + tp_23 * m[2][2] + tp_17 * m[0][2]))
    ];
  },

  normalize: (vector) => {
    let magnitude = Math.sqrt(vector[0]**2 + vector[1]**2 + vector[2]**2);
    return vector.map((val) => val/magnitude);
  }
}

export { threeD };