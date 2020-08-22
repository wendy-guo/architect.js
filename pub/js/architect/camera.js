import { degToRad } from "./angles.js";

class Camera {
    fieldOfView = 0;
    rotation = 0;

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
}

export { Camera };