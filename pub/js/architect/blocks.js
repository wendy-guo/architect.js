"use strict";
import { gridWaves } from "./grid-waves.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";


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

class Block {
    geometry = null;
    normals = cubeNormals;
    position = [0, 0, 0];

    positionBuffer = null;
    normalBuffer = null;
    colourBuffer = null;
    colour = [];
    dimensions = [1, 1, 1];
    matrix = null;  // transformation matrix (for animations, etc.)

    // cube
    constructor(dimensions, position, colour){   // add lighting boolean
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
        this.position = position;

        colour.forEach((c) => {
            for (let i = 0; i < 6; i++){
                this.colour.push(c[0]);
                this.colour.push(c[1]);
                this.colour.push(c[2]);
            }
        });
    }

    addBuffers(gl){
        this.positionBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.colourBuffer = gl.createBuffer();
    }

    setDimensions(dimensions){
        this.dimensions = dimensions;
        this.geometry = cubeGeometry.map((val, i) => val * dimensions[i % 3]);
    }

    draw(scene){
        let matrix = threeD.translate(scene.matrix, this.position[0], this.position[1], this.position[2]);
        this.setMatrix(matrix);

        utils.setupBufferAttribPointers(scene.gl, this);
        utils.enableAttribUniform(scene.gl, scene.program, this);
        scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);

    }

    setColour(colour) {
        this.colour = [];

        colour.forEach((c) => {
            for (let i = 0; i < 6; i++) {
                this.colour.push(c[0]);
                this.colour.push(c[1]);
                this.colour.push(c[2]);
            }
        });
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

    angle = 0;
    animation = gridWaves.static;

    constructor(rows, columns, dimensions, position, colour) {
        this.rows = rows;
        this.columns = columns;
        this.dimensions = dimensions;
        this.position = position;
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < columns; c++){
                row.push(new Block(dimensions, [position[0] + r * dimensions[0], position[1], position[2] + c * dimensions[2]], colour));
            }
            this.blocks.push(row);
        }
    }

    setAnimation(animation){
        this.animation = animation;
    }

    draw(scene){
        this.angle = this.animation(this.angle, this.rows, this.columns, this.blocks, scene);
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

    constructor(numSteps, dimensions, position, colour){
        this.numSteps = numSteps;
        this.dimensions = dimensions;
        this.position = position;
        for (let i = 0; i < numSteps; i++){
            this.blocks.push(new Block(dimensions, position.map((val, j) => {
                if (j != 2){
                    return val + dimensions[j] * i;
                } 
                return val;
            }), colour));
        }
    }

    draw(scene) {
        for (let i = 0; i < this.numSteps; i++) {
            let matrix = threeD.translate(scene.matrix, this.blocks[i].position[0], this.blocks[i].position[1], this.blocks[i].position[2]);
            this.blocks[i].setMatrix(matrix);

            utils.setupBufferAttribPointers(scene.gl, this.blocks[i]);
            utils.enableAttribUniform(scene.gl, scene.program, this.blocks[i]);
            scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);
        }
    }
}

export { Block, Stairs, BlocksGrid };