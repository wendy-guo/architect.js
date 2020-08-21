import { vertexShaderSource, fragmentShaderSource, vertexShaderSourceWithLighting, fragmentShaderSourceWithLighting } from "./shaders.js";
import { degToRad, radToDeg } from "./angles.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";
import { Block, Stairs, BlocksGrid } from "./blocks.js";
import { gridWaves } from "./grid-waves.js";
import { Camera } from "./camera.js";
import { Scene } from "./scene.js";

console.log("hello architect ^^");

(function (global) { // the window object serves as the global object in the browser.

    // this function is currently only in the scope of the anonymous function at the moment.
    function Architect() {
        this.gridWaves = gridWaves;
        this.Block = Block;
        this.Stairs = Stairs,
        this.BlocksGrid = BlocksGrid;
        this.Scene = Scene;
        this.Camera = Camera;
    }

    Architect.prototype = {

        getContext: (canvas) => {
            console.log("hi");
            return canvas.getContext("webgl");
        },

        getProgram: (gl, lighting) => {
            if (lighting) {
                return utils.setupProgram(gl, vertexShaderSourceWithLighting, fragmentShaderSourceWithLighting, true)
            }
            return utils.setupProgram(gl, vertexShaderSource, fragmentShaderSource, false)
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

    }

    /* Can do all other library setup below without conflicting with the global namespace */


    global.Architect = global.Architect || Architect

})(window);

