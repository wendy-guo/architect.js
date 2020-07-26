import { Architect } from "./architect/architect.js";

const log = console.log;

// canvases
const canvas_1 = document.getElementById("architect-grid");
const canvas_2 = document.getElementById("structures-rotate");
//const canvas_3 = document.getElementById("structures-animate");
const canvas_4 = document.getElementById("interweaving");
const canvas_5 = document.getElementById("left-to-right");
const canvas_6 = document.getElementById("stingray-butterfly");
const canvas_7 = document.getElementById("corner-to-corner");

// webgl contexts
const gl_1 = Architect.getContext(canvas_1);
const gl_2 = Architect.getContext(canvas_2);
//const gl_3 = Architect.getContext(canvas_3);
const gl_4 = Architect.getContext(canvas_4);
const gl_5 = Architect.getContext(canvas_5);
const gl_6 = Architect.getContext(canvas_6);
const gl_7 = Architect.getContext(canvas_7);

// programs
const program_1 = Architect.getProgram(gl_1);
const program_2 = Architect.getProgram(gl_2);
//const program_3 = Architect.getProgram(gl_3);
const program_4 = Architect.getProgram(gl_4);
const program_5 = Architect.getProgram(gl_5);
const program_6 = Architect.getProgram(gl_6);
const program_7 = Architect.getProgram(gl_7);

// cameras
const camera_1 = new Architect.Camera(35, 0);
const camera_2 = new Architect.Camera(35, 0);
//const camera_3 = new Architect.Camera(35, 0);
const camera_4 = new Architect.Camera(35, 0);
const camera_5 = new Architect.Camera(35, 0);
const camera_6 = new Architect.Camera(35, 0);
const camera_7 = new Architect.Camera(35, 0);

// scenes
const scene_architectGrid = new Architect.Scene(gl_1, program_1, camera_1, [-1700, -300, 0], [90, 90, 0], [1, 1, 1]);  
const scene_structureRotate = new Architect.Scene(gl_2, program_2, camera_2, [0, -100, 0], [30, -30, 0], [1, 1, 1]); 
// const scene
const scene_grid1 = new Architect.Scene(gl_4, program_4, camera_4, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid2 = new Architect.Scene(gl_5, program_5, camera_5, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid3 = new Architect.Scene(gl_6, program_6, camera_6, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid4 = new Architect.Scene(gl_7, program_7, camera_7, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  




// other constants
const c1 = [[248, 196, 205],
[211, 137, 149],
[211, 137, 149],
[253, 231, 205],
[211, 137, 149],
[248, 196, 205]
];
const c2 = [[28, 16, 25],
[21, 17, 149],
[21, 137, 149],
[253, 21, 205],
[211, 17, 19],
[24, 96, 205]
];

// scene objects

const architectGrid = new Architect.BlocksGrid(10, 70, [55, 55, 55], [0, 0, 0], c1);
const blocks = architectGrid.blocks;
log(blocks[1][5]);
blocks[1][5].setColour(c2);
//architectGrid.setAnimation(Architect.gridWaves.interweaving);

// structuresRotate scene
const blocky1 = new Architect.Block([60, 375, 60], [200, 0, -100], c1);
const blocky2 = new Architect.Block([60, 250, 60], [-200, 0, 100], c1);
const bridge1 = new Architect.Block([60, 20, 200], [200, 300, -40], c1);
const bridge2 = new Architect.Block([140, 20, 60], [-140, 100, 100], c1);
const stairs = new Architect.Stairs(10, [20, 20, 60], [0, 100, 100], c1);
const hat1 = new Architect.Block([80, 15, 80], [-210, 250, 90], c1);
const hat2 = new Architect.Block([60, 15, 60], [-200, 270, 100], c1);
const hat3 = new Architect.Block([40, 15, 40], [-190, 290, 110], c1);
const hat4 = new Architect.Block([20, 15, 20], [-180, 310, 120], c1);

const grid1 = new Architect.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid1.setAnimation(Architect.gridWaves.interweaving);

const grid2 = new Architect.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid2.setAnimation(Architect.gridWaves.leftToRight);

const grid3 = new Architect.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid3.setAnimation(Architect.gridWaves.cornerToCorner);

const grid4 = new Architect.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid4.setAnimation(Architect.gridWaves.stingrayXbutterfly);


// add objects to respective scenes
scene_architectGrid.addToScene(architectGrid);

scene_structureRotate.addToScene(blocky1);
scene_structureRotate.addToScene(blocky2);
scene_structureRotate.addToScene(bridge1);
scene_structureRotate.addToScene(bridge2);
scene_structureRotate.addToScene(stairs);
scene_structureRotate.addToScene(hat1);
scene_structureRotate.addToScene(hat2);
scene_structureRotate.addToScene(hat3);
scene_structureRotate.addToScene(hat4);

scene_grid1.addToScene(grid1);

scene_grid2.addToScene(grid2);
scene_grid3.addToScene(grid3);
scene_grid4.addToScene(grid4);

requestAnimationFrame(drawScenes);

function drawScenes() {

    // update views for scenes
    Architect.updateView(scene_architectGrid);
    Architect.updateView(scene_structureRotate);
    Architect.updateView(scene_grid1);
    Architect.updateView(scene_grid2);
    Architect.updateView(scene_grid3);
    Architect.updateView(scene_grid4);

    // draw scenes
    scene_architectGrid.draw();
    scene_structureRotate.draw();
    scene_grid1.draw();
    scene_grid2.draw();
    scene_grid3.draw();
    scene_grid4.draw();

    scene_structureRotate.rotateScene([0, 1, 0]);
    // rotate scene
    requestAnimationFrame(drawScenes);  // request next frame
}

