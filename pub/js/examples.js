import {Architect} from "./architect/architect.js"

const c1 = [[248, 196, 205],
[211, 137, 149],
[211, 137, 149],
[253, 231, 205],
[211, 137, 149],
[248, 196, 205]
];

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl");

const program = Architect.program;
const scene = new Architect.Scene();
const camera = new Architect.Camera();
scene.setCamera(camera);

const grid = new Architect.BlocksGrid(gl, 15, 15, [20, 20, 20], [-50, 150, 0], c1);