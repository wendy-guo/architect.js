import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";
import { degToRad, radToDeg } from "./angles.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";
import { Block, Stairs, BlocksGrid } from "./blocks.js";
import { gridWaves } from "./grid-waves.js";
import { Camera } from "./camera.js";
import { Scene } from "./scene.js";

console.log("hello architect ^^");

const Architect = {

    view: null,

    getContext: (canvas) => {
        console.log("hi");
        return canvas.getContext("webgl");
    },
    
    getProgram: (gl) => {
        return utils.setupProgram(gl, vertexShaderSource, fragmentShaderSource)
    },

    updateView: (scene) => {
        utils.resetGL(scene.gl);
        scene.gl.useProgram(scene.program);

        let projection = threeD.perspective(scene.camera.fieldOfView, scene.gl.canvas.clientWidth / scene.gl.canvas.clientHeight, 1, 2000);
        let camera = threeD.yRotationMatrix(scene.camera.rotation);
        camera = threeD.translate(camera, 0, 0, 100);

        let view = threeD.inverse(camera);
        scene.setView(threeD.matrixMultiply(projection, view));
    },

    // animations
    gridWaves: gridWaves,

    // classes
    Block: Block,
    Stairs: Stairs,
    BlocksGrid: BlocksGrid,
    Scene: Scene,
    Camera: Camera
}


export { Architect };