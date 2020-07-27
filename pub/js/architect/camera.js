import { degToRad } from "./angles.js";

class Camera {
    fieldOfView = degToRad(35);
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

    rotate(angle){
        this.rotation += degToRad(angle);
    }
}

export { Camera };