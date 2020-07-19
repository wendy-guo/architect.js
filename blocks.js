"use strict";

const cubeGeometry = [ 
    //face 1
    0, 0, 0,
    0, 1, 0,
    1, 0, 0,
    1, 1, 0,
    1, 0, 0,
    0, 1, 0,

    // face 2
    0, 0, 1,
    1, 0, 1,
    0, 1, 1,
    1, 1, 1,
    0, 1, 1,
    1, 0, 1,

    // face 3
    0, 0, 0,
    0, 0, 1,
    0, 1, 0,
    0, 1, 1,
    0, 1, 0,
    0, 0, 1,

    // face 4
    1, 0, 0,
    1, 1, 0,
    1, 0, 1,
    1, 1, 1,
    1, 0, 1,
    1, 1, 0,

    // face 5
    0, 0, 0,
    1, 0, 0,
    0, 0, 1,
    1, 0, 1,
    0, 0, 1,
    1, 0, 0,

    // face 6
    0, 1, 0,
    0, 1, 1,
    1, 1, 0,
    1, 1, 1,
    1, 1, 0,
    0, 1, 1
];
const defaultColours = [
    // face 1 (front)
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,

    // face 2
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,

    // face 3
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,

    // face 4 (right)
    253, 231, 205,
    253, 231, 205,
    253, 231, 205,
    253, 231, 205,
    253, 231, 205, 
    253, 231, 205,

    // face 5 (top)
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,

    // face 6
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,


];

class Block {
    geometry = cubeGeometry;
    colours = defaultColours;
    positionBuffer = null;
    colourBuffer = null;
    dimensions = [1, 1, 1];
    matrix = null;  // transformation matrix (for animations, etc.)

    // cube
    constructor(gl, sideLength){
        this.geometry = this.geometry.map((val) => val * sideLength);
        this.positionBuffer = gl.createBuffer();
        this.colourBuffer = gl.createBuffer();
        this.dimensions *= sideLength;
    }

    setMatrix(matrix){
        this.matrix = matrix;
    }

    getGeometry(){
        return this.geometry;
    }

    getColours(){
        return this.colours;
    }

    getMatrix(){
        return this.matrix;
    }

    getPositionBuffer(){
        return this.positionBuffer;
    }

    getColourBuffer(){
        return this.colourBuffer;
    }

}

class Blocks {
    blocks = [];
    dimensions = [];
}

class Stairs {
    steps = [];
    numSteps = 0;
    spaceBetween = [0, 0, 0];
    height = 0;
    width = 0;
    depth = 0;

    constructor(gl, numSteps, sideLength){
        this.numSteps = numSteps;
        for (let i = 0; i < numSteps; i++){
            this.steps.push(new Block(gl, sideLength));
        }
        this.height = sideLength;
        this.width = sideLength;
        this.depth = sideLength;
    }


}

export { Block, Stairs };