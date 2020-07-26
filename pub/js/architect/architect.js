import { vertexShaderSource, fragmentShaderSource } from "./shaders.js";
import { degToRad, radToDeg } from "./angles.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";
import { Block, Stairs, BlocksGrid } from "./blocks.js";
import { gridWaves } from "./grid-waves.js";

const Architect = {
    gl: null,

    getContext: (canvas) => {
        console.log("hi");
        Architect.gl = canvas.getContext("webgl");
        return Architect.gl;
    },
    
    getProgram: () => {
        return utils.setupProgram(Architect.gl, vertexShaderSource, fragmentShaderSource)
    },

    // classes
    Block: Block,
    Stairs: Stairs,
    BlocksGrid: BlocksGrid,
    Scene: "scene",
}


export { Architect };