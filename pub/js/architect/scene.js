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
    matrix = null;
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
        this.updateMatrix();
    }

    updateMatrix(){
        this.matrix = threeD.transform(this.view, this.translation, this.rotation, this.scale);
    }

    draw(){
        // if not attached, error
        this.objects.forEach((obj) => {
            // check object type and draw accordingly
            if (obj instanceof Block){
            } else if (obj instanceof BlocksGrid){
                obj.draw(this);
            }
        });
    }

}

export { Scene };