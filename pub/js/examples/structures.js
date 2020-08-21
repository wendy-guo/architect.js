const arch = new Architect();

// canvases
const canvas_1 = document.getElementById("structure1");
const canvas_2 = document.getElementById("structure2");
const canvas_3 = document.getElementById("structure1-translating");
const canvas_4 = document.getElementById("structure2-scaling");


// webgl contexts
const gl_1 = arch.getContext(canvas_1);
const gl_2 = arch.getContext(canvas_2);
const gl_3 = arch.getContext(canvas_3);
const gl_4 = arch.getContext(canvas_4);


// programs
const program_1 = arch.getProgram(gl_1, false);
const program_2 = arch.getProgram(gl_2, false);
const program_3 = arch.getProgram(gl_3, false);
const program_4 = arch.getProgram(gl_4, true);


// cameras
const camera_1 = new arch.Camera(35, 0);
const camera_2 = new arch.Camera(35, 0);
const camera_3 = new arch.Camera(35, 0);
const camera_4 = new arch.Camera(35, 0);


// scenes
const scene_1 = new arch.Scene(gl_1, program_1, camera_1, [0, -50, 0], [50, -30, 0], [0.75, 0.75, 0.75]);  
const scene_2 = new arch.Scene(gl_2, program_2, camera_2, [0, -200, 0], [20, -50, 0], [1.5, 1.5, 1.5]); 
const scene_3 = new arch.Scene(gl_3, program_3, camera_3, [0, -50, 0], [50, -30, 0], [0.75, 0.75, 0.75]);
const scene_4 = new arch.Scene(gl_4, program_4, camera_4, [0, -200, 0], [20, -50, 0], [1.5, 1.5, 1.5]); 

// other constants
const c1 = [[248, 196, 205],
[211, 137, 149],
[211, 137, 149],
[253, 231, 205],
[211, 137, 149],
[248, 196, 205]
];
const c2 = [[200, 242, 243],
    [133, 198, 199],
    [133, 198, 199],
[253, 231, 205],
    [133, 198, 199],
    [200, 242, 243]
];

const c3 = [[59, 24, 24],
    [59, 24, 24],
    [59, 24, 24],
    [59, 24, 24],
    [59, 24, 24],
    [53, 20, 20]]

const c4 = [[142, 187, 105],
    [142, 187, 105],
    [142, 187, 105],
    [142, 187, 105],
    [142, 187, 105],
    [142, 187, 105]]

// scene objects

const platform = new arch.Block([550, 20, 500], [-250, -20, -250], c2);
const blocky1 = new arch.Block([60, 375, 60], [200, 0, -100], c1);
const blocky2 = new arch.Block([60, 250, 60], [-200, 0, 100], c1);
const bridge1 = new arch.Block([60, 20, 200], [200, 300, -40], c1);
const bridge2 = new arch.Block([140, 20, 60], [-140, 100, 100], c1);
const stairs = new arch.Stairs(10, [20, 20, 60], [0, 100, 100], c1);
const hat1 = new arch.Block([80, 15, 80], [-210, 250, 90], c1);
const hat2 = new arch.Block([60, 15, 60], [-200, 270, 100], c1);
const hat3 = new arch.Block([40, 15, 40], [-190, 290, 110], c1);
const hat4 = new arch.Block([20, 15, 20], [-180, 310, 120], c1);

const trunk = new arch.Block([50, 70, 50], [0, 0, 0], c3);
const tree1 = new arch.Block([160, 80, 160], [-50, 70, -50], c4);
const tree2 = new arch.Block([120, 60, 120], [-30, 150, -30], c4);
const tree3 = new arch.Block([80, 40, 80], [-10, 210, -10], c4);
const tree4 = new arch.Block([40, 40, 40], [10, 250, 10], c4);

const platform_r = new arch.Block([550, 20, 500], [-250, -20, -250], c2);
const blocky1_r = new arch.Block([60, 375, 60], [200, 0, -100], c1);
const blocky2_r = new arch.Block([60, 250, 60], [-200, 0, 100], c1);
const bridge1_r = new arch.Block([60, 20, 200], [200, 300, -40], c1);
const bridge2_r = new arch.Block([140, 20, 60], [-140, 100, 100], c1);
const stairs_r = new arch.Stairs(10, [20, 20, 60], [0, 100, 100], c1);
const hat1_r = new arch.Block([80, 15, 80], [-210, 250, 90], c1);
const hat2_r = new arch.Block([60, 15, 60], [-200, 270, 100], c1);
const hat3_r = new arch.Block([40, 15, 40], [-190, 290, 110], c1);
const hat4_r = new arch.Block([20, 15, 20], [-180, 310, 120], c1);

const trunk_r = new arch.Block([50, 70, 50], [0, 0, 0], c3);
const tree1_r = new arch.Block([160, 80, 160], [-50, 70, -50], c4);
const tree2_r = new arch.Block([120, 60, 120], [-30, 150, -30], c4);
const tree3_r = new arch.Block([80, 40, 80], [-10, 210, -10], c4);
const tree4_r = new arch.Block([40, 40, 40], [10, 250, 10], c4);

// add objects to respective scenes
scene_1.addToScene(platform);
scene_1.addToScene(blocky1);
scene_1.addToScene(blocky2);
scene_1.addToScene(bridge1);
scene_1.addToScene(bridge2);
scene_1.addToScene(stairs);
scene_1.addToScene(hat1);
scene_1.addToScene(hat2);
scene_1.addToScene(hat3);
scene_1.addToScene(hat4);

scene_2.addToScene(trunk);
scene_2.addToScene(tree1);
scene_2.addToScene(tree2);
scene_2.addToScene(tree3);
scene_2.addToScene(tree4);

scene_3.addToScene(platform_r);
scene_3.addToScene(blocky1_r);
scene_3.addToScene(blocky2_r);
scene_3.addToScene(bridge1_r);
scene_3.addToScene(bridge2_r);
scene_3.addToScene(stairs_r);
scene_3.addToScene(hat1_r);
scene_3.addToScene(hat2_r);
scene_3.addToScene(hat3_r);
scene_3.addToScene(hat4_r);

scene_4.addToScene(trunk_r);
scene_4.addToScene(tree1_r);
scene_4.addToScene(tree2_r);
scene_4.addToScene(tree3_r);
scene_4.addToScene(tree4_r);


requestAnimationFrame(drawScenes);

function drawScenes() {

    // update views for scenes
    arch.updateView(scene_1);
    arch.updateView(scene_2);
    arch.updateView(scene_3);
    arch.updateView(scene_4);

    // draw scenes
    scene_1.draw();
    scene_2.draw();
    scene_3.draw();
    scene_4.draw();

    // transform scenes
    scene_3.rotateScene([0, 1, 0]);
    scene_4.rotateScene([0, 1, 0]);

    requestAnimationFrame(drawScenes);  // request next frame
}