const arch = new Architect();

// canvases
const canvas_4 = document.getElementById("interweaving");
const canvas_5 = document.getElementById("left-to-right");
const canvas_6 = document.getElementById("stingray-butterfly");
const canvas_7 = document.getElementById("corner-to-corner");

// webgl contexts
const gl_4 = arch.getContext(canvas_4);
const gl_5 = arch.getContext(canvas_5);
const gl_6 = arch.getContext(canvas_6);
const gl_7 = arch.getContext(canvas_7);

// programs
const program_4 = arch.getProgram(gl_4);
const program_5 = arch.getProgram(gl_5);
const program_6 = arch.getProgram(gl_6);
const program_7 = arch.getProgram(gl_7);

// cameras
const camera_4 = new arch.Camera(35, 0);
const camera_5 = new arch.Camera(35, 0);
const camera_6 = new arch.Camera(35, 0);
const camera_7 = new arch.Camera(35, 0);


// colours
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

// scenes
const scene_grid1 = new arch.Scene(gl_4, program_4, camera_4, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);
const scene_grid2 = new arch.Scene(gl_5, program_5, camera_5, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);
const scene_grid3 = new arch.Scene(gl_6, program_6, camera_6, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);
const scene_grid4 = new arch.Scene(gl_7, program_7, camera_7, [-50, 100, 0], [30, -30, 0], [1, 1, 1]);  

const grid1 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid1.setAnimation(arch.gridWaves.interweaving);

const grid2 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c2);
grid2.setAnimation(arch.gridWaves.leftToRight);

const grid3 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c1);
grid3.setAnimation(arch.gridWaves.cornerToCorner);

const grid4 = new arch.BlocksGrid(18, 18, [20, 20, 20], [0, 0, 0], c2);
grid4.setAnimation(arch.gridWaves.stingrayXbutterfly);

scene_grid1.addToScene(grid1);
scene_grid2.addToScene(grid2);
scene_grid3.addToScene(grid3);
scene_grid4.addToScene(grid4);

requestAnimationFrame(drawScenes);

function drawScenes() {

    // update views for scenes
    arch.updateView(scene_grid1);
    arch.updateView(scene_grid2);
    arch.updateView(scene_grid3);
    arch.updateView(scene_grid4);

    // draw scenes
    scene_grid1.draw();
    scene_grid2.draw();
    scene_grid3.draw();
    scene_grid4.draw();

    requestAnimationFrame(drawScenes);  // request next frame
}