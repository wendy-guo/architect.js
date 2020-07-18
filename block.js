"use strict";

class Block {
    geometry = [
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
        0, 1, 1,
    ];
    colours = [
        // face 1
        248, 180, 180,
        248, 180, 180,
        248, 180, 180,
        248, 180, 180,
        248, 180, 180,
        248, 180, 180,

        // face 2
        248, 196, 180,
        248, 196, 180,
        248, 196, 180,
        248, 196, 180,
        248, 196, 180,
        248, 196, 180,

        // face 3
        219, 248, 180,
        219, 248, 180,
        219, 248, 180,
        219, 248, 180,
        219, 248, 180,
        219, 248, 180,

        // face 4
        180, 248, 197,
        180, 248, 197,
        180, 248, 197,
        180, 248, 197,
        180, 248, 197,
        180, 248, 197,

        // face 5
        180, 215, 248,
        180, 215, 248,
        180, 215, 248,
        180, 215, 248,
        180, 215, 248,
        180, 215, 248,

        // face 6
        180, 185, 248,
        180, 185, 248,
        180, 185, 248, 
        180, 185, 248,
        180, 185, 248,
        180, 185, 248
    ];
    positionBuffer = null;
    colourBuffer = null;

    // cube
    constructor(gl, sideLength){
        this.geometry = this.geometry.map((val) => val * sideLength);
        console.log(this.geometry);
        this.positionBuffer = gl.createBuffer();
        this.colourBuffer = gl.createBuffer();
    }

}

export { Block };