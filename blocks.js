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

    // face 1
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,

    // face 2
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,

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

    // face 6
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,
    211, 137, 149,

    // face 5 (top)
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,
    248, 196, 205,

];
const cubeNormals = [


    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,
    -1, 0, 0,

    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,
    0, -1, 0,

    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

]

const convertRGB = (rgb) => {
    return rgb.map((val) => val/255);
}

class Block {
    geometry = null;
    normals = cubeNormals;
    position = null;

    positionBuffer = null;
    normalBuffer = null;
    colour = [0.2, 1, 0.2, 1];
    dimensions = [1, 1, 1];
    matrix = null;  // transformation matrix (for animations, etc.)

    // cube
    constructor(gl, dimensions, position, colour){ 
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
        this.position = position;
        this.positionBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.colour = convertRGB(colour);
        console.log(this.colour);
        this.colour.push(0.7);
    }

    setDimensions(dimensions){
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
    }

    setMatrix(matrix){
        this.matrix = matrix;
    }

    getGeometry(){
        return this.geometry;
    }

    getNormals(){
        return this.normals;
    }

    getMatrix(){
        return this.matrix;
    }

    getPositionBuffer(){
        return this.positionBuffer;
    }

    getNormalBuffer(){
        return this.normalBuffer;
    }

    getColour(){
        return this.colour;
    }

}


// to do
class BlocksGrid {
    blocks = [];
    rows = 0;
    columns = 0;
    dimensions = [1, 1, 1];

    constructor(gl, dimensions) {
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
        this.positionBuffer = gl.createBuffer();
        this.colourBuffer = gl.createBuffer();
    }

    setDimensions(dimensions) {
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
    }



}

class Stairs {
    blocks = [];
    numSteps = 0;    
    dimensions = [1, 1, 1];
    position = null;

    constructor(gl, numSteps, dimensions, position, colour){
        this.numSteps = numSteps;
        this.dimensions = dimensions;
        this.position = position;
        for (let i = 0; i < numSteps; i++){
            this.blocks.push(new Block(gl, dimensions, position.map((val, j) => {
                if (j != 2){
                    return val + dimensions[j] * i;
                } 
                return val;
            }), colour));
        }
    }

    addSteps(numSteps){
        this.numSteps += numSteps;
        // push more blocks
    }

    removeSteps(numSteps){
        //check not greater than this.numSteps
        this.numSteps -= numSteps;
        // pop off blocks from array
    }
}

class Structure {
    

}

export { Block, Stairs };