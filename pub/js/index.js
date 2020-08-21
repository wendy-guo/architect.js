const arch = new Architect();

// canvases
const canvas_1 = document.getElementById("architect-grid");

// webgl contexts
const gl_1 = arch.getContext(canvas_1);

// programs
const program_1 = arch.getProgram(gl_1);

// cameras
const camera_1 = new arch.Camera(35, 0);

// scenes
const scene_architectGrid = new arch.Scene(gl_1, program_1, camera_1, [-1300, -280, 0], [70, 90, 0], [0.8, 0.8, 0.8]);  


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


// add objects to respective scenes
scene_architectGrid.addToScene(architectGrid);

requestAnimationFrame(drawScenes);

function drawScenes() {

    // update views for scenes
    arch.updateView(scene_architectGrid);

    // draw scenes
    scene_architectGrid.draw();

    requestAnimationFrame(drawScenes);  // request next frame
}

