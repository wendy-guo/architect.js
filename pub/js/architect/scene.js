class Scene {
    // initial transformation settings
    translation = [0, 0, -1000];
    rotation = [degToRad(30), degToRad(-30), degToRad(0)];
    scale = [1, 1, 1];
    fieldOfViewRadians = degToRad(35);
    cameraRotation = 0;
    view;
    angle = 0;

    camera = null;

    canvas = null;

    objects = [];
    addToScene(object){
        this.objects.push(object);
    }

    setCamera(camera){
        this.camera = camera;
    }

    draw(){
        // if not attached, error
        this.objects.forEach(){
            // check object type and draw accordingly
        };

    }

    initialize(){

    }

}

export { Scene };