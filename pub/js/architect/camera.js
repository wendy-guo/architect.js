import { degToRad } from "./angles.js";

class Camera {
    fieldOfView = degToRad(35);
    rotation = 0;
    matrix = null;

    constructor(fieldOfView, rotation){
        this.fieldOfView = degToRad(fieldOfView);
        this.rotation = degToRad(rotation);
    }

    setFieldofView(fieldOfView){
        this.fieldOfViewRadians = degToRad(fieldOfView);
    }

    setRotation(rotation){
        this.rotation = degToRad(rotation);
    }

    getMatrix(){
        return 
    }
}

export { Camera };