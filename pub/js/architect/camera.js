class Camera {
    fieldOfViewRadians = degToRad(35);
    rotation = 0;

    setFieldofView(angle_rad){
        this.fieldOfViewRadians = angle_rad;
    }

    setRotation(rotation){
        this.rotation = rotation;
    }
}

export { Camera };