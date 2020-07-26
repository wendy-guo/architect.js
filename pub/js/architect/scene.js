import { degToRad } from "./angles.js";
import { Block, Stairs, BlocksGrid } from "./blocks.js";
import { threeD } from "./three-d.js";
import { utils } from "./utils.js";


class Scene {
    // initial transformation settings
    translation;
    rotation;
    scale;

    view = null;
    camera = null;

    gl = null;
    program = null;

    objects = [];

    // transformation of scene objects
    constructor(gl, program, camera, translation, rotation, scale){
        this.gl = gl;
        this.program = program;
        this.camera = camera;
        this.translation = [0, 0, -1000].map((val, i) => val + translation[i]);
        this.rotation = rotation.map((angle) => degToRad(angle));
        this.scale = scale;
    }

    addToScene(object){
        if (object instanceof Block) {
            object.addBuffers(this.gl);
        } else if (object instanceof BlocksGrid) {
            object.blocks.forEach((row) => {
                row.forEach((b) => {
                    b.addBuffers(this.gl);
                })
            });
        }
        this.objects.push(object);
    }

    setCamera(camera){
        this.camera = camera;
    }

    setView(view){
        this.view = view;
    }

    draw(){
        let matrix = threeD.transform(this.view, this.translation, this.rotation, this.scale);
        // if not attached, error
        this.objects.forEach((obj) => {
            // check object type and draw accordingly
            if (obj instanceof Block){
                console.log("block!")
            } else if (obj instanceof BlocksGrid){

                for (let r = 0; r < obj.rows; r++) {
                    for (let c = 0; c < obj.columns; c++) {
                        let block = obj.blocks[r][c];

                        let m = threeD.translate(matrix, block.position[0], block.position[1], block.position[2]);
                        block.setMatrix(m);

                        utils.setupBufferAttribPointers(this.gl, block);
                        utils.enableAttribUniform(this.gl, this.program, block);
                        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)});
                    }
                }
            }
        });
    }

    initialize(){

    }

}

export { Scene };