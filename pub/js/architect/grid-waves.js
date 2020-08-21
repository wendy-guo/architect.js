import { threeD } from "./three-d.js";
import { utils } from "./utils.js";



const getScaleFactor = (angle) => {
    let scaleFactor = Math.sin(angle) + 1;  // sin goes from -1 -> 1, changing to 0 -> 2
    scaleFactor *= 2 // change to 0 -> 4
    return ++scaleFactor; // change to 1 -> 4
};

const gridWaves = {

    static: (angle, rows, columns, blocks, scene) => {

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let matrix = threeD.translate(scene.matrix, blocks[r][c].position[0], blocks[r][c].position[1], blocks[r][c].position[2]);
                blocks[r][c].setMatrix(matrix);

                utils.setupBufferAttribPointers(scene.gl, blocks[r][c]);
                utils.enableAttribUniform(scene.gl, scene.program, blocks[r][c]);
                scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);
            }
        }
        return angle
    },

    leftToRight: (angle, rows, columns, blocks, scene) => {

        let offset = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let matrix = threeD.translate(scene.matrix, blocks[r][c].position[0], blocks[r][c].position[1], blocks[r][c].position[2]);
                matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offset), 1, 25);
                blocks[r][c].setMatrix(matrix);

                utils.setupBufferAttribPointers(scene.gl, blocks[r][c]);
                utils.enableAttribUniform(scene.gl, scene.program, blocks[r][c]);
                scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);
            }
            offset += 0.25;
        }

        return angle + 0.1;
    },

    interweaving: (angle, rows, columns, blocks, scene) => {

        let offsetR = 0;
        let offsetC = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let matrix = threeD.translate(scene.matrix, blocks[r][c].position[0], blocks[r][c].position[1], blocks[r][c].position[2]);
                matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offsetR + offsetC), 1, 25);
                blocks[r][c].setMatrix(matrix);


                utils.setupBufferAttribPointers(scene.gl, blocks[r][c]);
                utils.enableAttribUniform(scene.gl, scene.program, blocks[r][c]);
                scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);

                offsetC += 0.1;
            }
            offsetR += 0.1;
        }

        return angle + 0.1;
    },

    cornerToCorner: (angle, rows, columns, blocks, scene) => {

        let offsetR = 0.5;
        let offsetC = 0.5;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                let matrix = threeD.translate(scene.matrix, blocks[r][c].position[0], blocks[r][c].position[1], blocks[r][c].position[2]);
                matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offsetR + offsetC), 1, 25);
                blocks[r][c].setMatrix(matrix);

                utils.setupBufferAttribPointers(scene.gl, blocks[r][c]);
                utils.enableAttribUniform(scene.gl, scene.program, blocks[r][c]);
                scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);

                offsetC *= 1.1;
            }
            offsetR *= 1.1;
            offsetC = 0.5;
        }

        return angle + 0.1;
    },

    stingrayXbutterfly: (angle, rows, columns, blocks, scene) => {


        let offset = 0;

        for (let r = 0; r < rows; r++) {

            for (let c = 0; c < columns; c++) {
                let matrix = threeD.translate(scene.matrix, blocks[r][c].position[0], blocks[r][c].position[1], blocks[r][c].position[2]);
                matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offset), 1, 25);
                blocks[r][c].setMatrix(matrix);

                utils.setupBufferAttribPointers(scene.gl, blocks[r][c]);
                utils.enableAttribUniform(scene.gl, scene.program, blocks[r][c]);
                scene.gl.drawArrays(scene.gl.TRIANGLES, 0, 6 * 6);
            }
            if (r < rows / 2) {
                offset += 0.3;
            } else {
                offset -= 0.3;
            }
        }

        return angle + 0.1;
    },

    centreOutwards: () => {
        utils.resize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        utils.setSettings(gl);

        gl.useProgram(program);

        let offset = 0;

        for (let r = 0; r < rows; r++) {
            let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
            for (let c = 0; c < columns; c++) {
                let dist = getDistance([r * sideLength + r * 5, c * sideLength + c * 5], centre);
                offset = getOffset(dist, maxDistance);
                //offset = getOffset(dist, maxDistance);
                matrix = threeD.translate(matrix, 0, 0, 30);
                gl.uniformMatrix4fv(matrixU, false, threeD.scale(matrix, 1, getScaleFactor(angle + offset), 1, 25));

                utils.enableBufferAttribPointers(gl, program, moreBlocks[r * columns + c]);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)}, 100);
            }
        }

        angle += 0.07;
        requestAnimationFrame(drawScene);
    }

}

export {gridWaves};