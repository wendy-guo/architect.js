const gridWaves = {
    leftToRight: () => {
        let angle = 0;
        requestAnimationFrame(drawScene);

        function drawScene() {

            utils.resize(gl.canvas);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            utils.setSettings(gl);

            gl.useProgram(program);

            let offset = 0;

            for (let r = 0; r < rows; r++) {
                let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
                matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offset), 1, 25);
                for (let c = 0; c < columns; c++) {
                    matrix = threeD.translate(matrix, 0, 0, 30);
                    gl.uniformMatrix4fv(matrixU, false, matrix);

                    utils.enableBufferAttribPointers(gl, program, moreBlocks[r * columns + c]);
                    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)}, 100);
                }
                offset += 0.2;
            }

            angle += 0.05;
            requestAnimationFrame(drawScene);
        }

        function getScaleFactor(angle){
            let scaleFactor = Math.sin(angle) + 1;  // sin goes from -1 -> 1, changing to 0 -> 2
            scaleFactor *= 2 // change to 0 -> 4
            return ++scaleFactor; // change to 1 -> 4
        }
    },

    interweaving: (angle, offsets, initMatrix) => {
        return [threeD.scale(initMatrix, 1, getScaleFactor(angle + offsets[0] + offsets[1]), 1, 25)];
    },

    _interweaving: () => {
        let offsetR = 0;
        let offsetC = 0;

        for (let r = 0; r < rows; r++) {
            let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
            for (let c = 0; c < columns; c++) {
                matrix = threeD.translate(matrix, 0, 0, 30);
                gl.uniformMatrix4fv(matrixU, false, threeD.scale(matrix, 1, getScaleFactor(angle + offsetR + offsetC), 1, 25));

                utils.enableBufferAttribPointers(gl, program, moreBlocks[r * columns + c]);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)}, 100);

                offsetC += 0.2;
            }
            offsetR += 0.2;
        }

        angle += 0.05;
        requestAnimationFrame(drawScene);
    },

    cornerToCorner: () => {
        let offsetR = 0.5;
        let offsetC = 0.5;

        for (let r = 0; r < rows; r++) {
            let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
            for (let c = 0; c < columns; c++) {
                matrix = threeD.translate(matrix, 0, 0, 30);
                gl.uniformMatrix4fv(matrixU, false, threeD.scale(matrix, 1, getScaleFactor(angle + offsetR + offsetC), 1, 25));

                utils.enableBufferAttribPointers(gl, program, moreBlocks[r * columns + c]);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)}, 100);

                offsetC *= 1.1;
            }
            offsetR *= 1.1;
            offsetC = 0.5;
        }

        angle += 0.05;
        requestAnimationFrame(drawScene);
    },

    stingrayXbutterfly: () => {
        utils.resize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        utils.setSettings(gl);

        gl.useProgram(program);

        let offset = 0;

        for (let r = 0; r < rows; r++) {
            let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
            matrix = threeD.scale(matrix, 1, getScaleFactor(angle + offset), 1, 25);
            for (let c = 0; c < columns; c++) {
                matrix = threeD.translate(matrix, 0, 0, 30);
                gl.uniformMatrix4fv(matrixU, false, matrix);

                utils.enableBufferAttribPointers(gl, program, moreBlocks[r * columns + c]);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);  // number of points (every 3 points draws 1 triangle)}, 100);
            }

            if (r < rows / 2) {
                offset += 0.3;
            } else {
                offset -= 0.3;
            }
        }

        angle += 0.05;
        requestAnimationFrame(drawScene);
    },

    centreOutwards: () => {
        utils.resize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        utils.setSettings(gl);

        gl.useProgram(program);

        let offset = 0;
        log(centre);

        for (let r = 0; r < rows; r++) {
            let matrix = threeD.translate(initMatrix, 30 * r, 0, 0);
            for (let c = 0; c < columns; c++) {
                let dist = getDistance([r * sideLength + r * 5, c * sideLength + c * 5], centre);
                offset = getOffset(dist, maxDistance);
                log(offset);
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