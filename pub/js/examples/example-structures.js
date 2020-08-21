const arch = new Architect();

// canvases
const canvas_1 = document.getElementById("architect-grid");
const canvas_2 = document.getElementById("structures-rotate");
//const canvas_3 = document.getElementById("structures-animate");
const canvas_4 = document.getElementById("interweaving");
const canvas_5 = document.getElementById("left-to-right");
const canvas_6 = document.getElementById("stingray-butterfly");
const canvas_7 = document.getElementById("corner-to-corner");

// webgl contexts
const gl_1 = arch.getContext(canvas_1);
const gl_2 = arch.getContext(canvas_2);
//const gl_3 = arch.getContext(canvas_3);
const gl_4 = arch.getContext(canvas_4);
const gl_5 = arch.getContext(canvas_5);
const gl_6 = arch.getContext(canvas_6);
const gl_7 = arch.getContext(canvas_7);

// programs
const program_1 = arch.getProgram(gl_1);
const program_2 = arch.getProgram(gl_2);
//const program_3 = arch.getProgram(gl_3);
const program_4 = arch.getProgram(gl_4);
const program_5 = arch.getProgram(gl_5);
const program_6 = arch.getProgram(gl_6);
const program_7 = arch.getProgram(gl_7);

// cameras
const camera_1 = new arch.Camera(35, 0);
const camera_2 = new arch.Camera(35, 0);
//const camera_3 = new arch.Camera(35, 0);
const camera_4 = new arch.Camera(35, 0);
const camera_5 = new arch.Camera(35, 0);
const camera_6 = new arch.Camera(35, 0);
const camera_7 = new arch.Camera(35, 0);

// scenes
const scene_architectGrid = new arch.Scene(gl_1, program_1, camera_1, [-1300, -280, 0], [70, 90, 0], [0.8, 0.8, 0.8]);  
const scene_structureRotate = new arch.Scene(gl_2, program_2, camera_2, [0, -100, 0], [30, -30, 0], [1, 1, 1]); 
// const scene
const scene_grid1 = new arch.Scene(gl_4, program_4, camera_4, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid2 = new arch.Scene(gl_5, program_5, camera_5, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid3 = new arch.Scene(gl_6, program_6, camera_6, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  
const scene_grid4 = new arch.Scene(gl_7, program_7, camera_7, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  




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

// scene objects

const architectGrid = new arch.BlocksGrid(11, 63, [55, 55, 55], [0, 0, 0], c1);
const blocks = architectGrid.blocks;

// a

blocks[3][3].setColour(c2);
blocks[4][3].setColour(c2);

blocks[2][4].setColour(c2);
blocks[2][5].setColour(c2);
blocks[2][6].setColour(c2);
blocks[2][7].setColour(c2);

blocks[2][7].setColour(c2);
blocks[3][7].setColour(c2);
blocks[4][7].setColour(c2);
blocks[6][7].setColour(c2);

blocks[5][4].setColour(c2);
blocks[5][5].setColour(c2);
blocks[5][6].setColour(c2);
blocks[5][7].setColour(c2);

blocks[7][4].setColour(c2);
blocks[7][5].setColour(c2);
blocks[7][6].setColour(c2);

// r
blocks[2][10].setColour(c2);
blocks[3][10].setColour(c2);
blocks[4][10].setColour(c2);
blocks[5][10].setColour(c2);
blocks[6][10].setColour(c2);
blocks[7][10].setColour(c2);

blocks[6][11].setColour(c2);
blocks[6][14].setColour(c2);

blocks[7][12].setColour(c2);
blocks[7][13].setColour(c2);

// c

blocks[3][17].setColour(c2);
blocks[4][17].setColour(c2);
blocks[5][17].setColour(c2);
blocks[6][17].setColour(c2);

blocks[2][18].setColour(c2);
blocks[2][19].setColour(c2);
blocks[2][20].setColour(c2);

blocks[3][21].setColour(c2);

blocks[7][18].setColour(c2);
blocks[7][19].setColour(c2);
blocks[7][20].setColour(c2);

blocks[6][21].setColour(c2);

// h

blocks[2][24].setColour(c2);
blocks[3][24].setColour(c2);
blocks[4][24].setColour(c2);
blocks[5][24].setColour(c2);
blocks[6][24].setColour(c2);
blocks[7][24].setColour(c2);
blocks[8][24].setColour(c2);
blocks[9][24].setColour(c2);

blocks[6][25].setColour(c2);
blocks[6][26].setColour(c2);
blocks[6][27].setColour(c2);

blocks[2][28].setColour(c2);
blocks[3][28].setColour(c2);
blocks[4][28].setColour(c2);
blocks[5][28].setColour(c2);

// i

blocks[2][31].setColour(c2);
blocks[3][31].setColour(c2);
blocks[4][31].setColour(c2);
blocks[5][31].setColour(c2);
blocks[6][31].setColour(c2);

blocks[8][31].setColour(c2);

// t

blocks[3][35].setColour(c2);
blocks[4][35].setColour(c2);
blocks[5][35].setColour(c2);
blocks[6][35].setColour(c2);
blocks[7][35].setColour(c2);
blocks[8][35].setColour(c2);

blocks[6][34].setColour(c2);
blocks[6][36].setColour(c2);
blocks[6][37].setColour(c2);

blocks[2][36].setColour(c2);
blocks[2][37].setColour(c2);

blocks[3][38].setColour(c2);


// e
blocks[2][42].setColour(c2);
blocks[2][43].setColour(c2);
blocks[2][44].setColour(c2);

blocks[3][41].setColour(c2);
blocks[4][41].setColour(c2);
blocks[5][41].setColour(c2);
blocks[6][41].setColour(c2);

blocks[5][42].setColour(c2);
blocks[5][43].setColour(c2);
blocks[5][44].setColour(c2);
blocks[5][45].setColour(c2);

blocks[6][45].setColour(c2);

blocks[7][42].setColour(c2);
blocks[7][43].setColour(c2);
blocks[7][44].setColour(c2);

blocks[3][45].setColour(c2);

// c

blocks[3][48].setColour(c2);
blocks[4][48].setColour(c2);
blocks[5][48].setColour(c2);
blocks[6][48].setColour(c2);

blocks[2][49].setColour(c2);
blocks[2][50].setColour(c2);
blocks[2][51].setColour(c2);

blocks[3][52].setColour(c2);

blocks[7][49].setColour(c2);
blocks[7][50].setColour(c2);
blocks[7][51].setColour(c2);

blocks[6][52].setColour(c2);

// t

blocks[3][56].setColour(c2);
blocks[4][56].setColour(c2);
blocks[5][56].setColour(c2);
blocks[6][56].setColour(c2);
blocks[7][56].setColour(c2);
blocks[8][56].setColour(c2);

blocks[6][55].setColour(c2);
blocks[6][57].setColour(c2);
blocks[6][58].setColour(c2);

blocks[2][57].setColour(c2);
blocks[2][58].setColour(c2);

blocks[3][59].setColour(c2);




architectGrid.setAnimation(arch.gridWaves.leftToRight);

// structuresRotate scene
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

const grid1 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid1.setAnimation(arch.gridWaves.interweaving);

const grid2 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c2);
grid2.setAnimation(arch.gridWaves.leftToRight);

const grid3 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid3.setAnimation(arch.gridWaves.cornerToCorner);

const grid4 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c2);
grid4.setAnimation(arch.gridWaves.stingrayXbutterfly);


// add objects to respective scenes
scene_architectGrid.addToScene(architectGrid);

scene_structureRotate.addToScene(platform);
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
    arch.updateView(scene_architectGrid);
    arch.updateView(scene_structureRotate);
    arch.updateView(scene_grid1);
    arch.updateView(scene_grid2);
    arch.updateView(scene_grid3);
    arch.updateView(scene_grid4);

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

