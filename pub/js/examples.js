const canvas_1 = document.getElementById("architect-grid");
const gl_1 = Architect.getContext(canvas_1);


const program_1 = Architect.getProgram(gl_1);

const camera_1 = new Architect.Camera(35, 0);
const sceneArchitectGrid = new Architect.Scene(gl_1, program_1, camera_1, [0, 0, 0], [30, -30, 0], [1, 1, 1]);  // option of null for transformations

const c1 = [[248, 196, 205],
[211, 137, 149],
[211, 137, 149],
[253, 231, 205],
[211, 137, 149],
[248, 196, 205]];

const architectGrid = new Architect.BlocksGrid(gl_1, 15, 15, [20, 20, 20], [-50, 150, 0], c1);
sceneArchitectGrid.addToScene(architectGrid);

