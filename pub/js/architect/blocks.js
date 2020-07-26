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
    lighting = null;

    positionBuffer = null;
    normalBuffer = null;
    colourBuffer = null;
    colour = [];
    dimensions = [1, 1, 1];
    matrix = null;  // transformation matrix (for animations, etc.)

    // cube
    constructor(gl, dimensions, position, colour){   // add lighting boolean
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
        this.position = position;
        this.positionBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.colourBuffer = gl.createBuffer();
        this.lighting = colour.length === 3;

        if (!this.lighting){
            colour.forEach((c) => {
                for (let i = 0; i < 6; i++){
                    this.colour.push(c[0]);
                    this.colour.push(c[1]);
                    this.colour.push(c[2]);
                }
            });
            
        } else {
            this.colour = convertRGB(colour);
            this.colour.push(0.8);
        }
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

    getColourBuffer(){
        return this.colourBuffer;
    }

    getColour(){
        return this.colour;
    }

    getColours(){
        return this.colour;
    }

    getLighting(){
        return this.lighting;
    }

}


// to do
class BlocksGrid {
    blocks = [];
    rows = 0;
    columns = 0;
    dimensions = [1, 1, 1];
    numBlocks = 0;

    constructor(gl, rows, columns, dimensions, position, colour) {
        this.rows = rows;
        this.columns = columns;
        this.dimensions = dimensions;
        this.position = position;
        for (let r = 0; r < rows; r++) {
            let row = []
            for (let c = 0; c < columns; c++){
                row.push(new Block(gl, dimensions, [position[0] + r * dimensions[0], position[1], position[2] + c * dimensions[2]], colour));
            }
            this.blocks.push(row);
        }

    }


    // todo
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

export { Block, Stairs, BlocksGrid };