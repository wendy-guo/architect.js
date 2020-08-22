# architect.js

landing page: https://architectjs.herokuapp.com/ <br>
documentation: https://architectjs.herokuapp.com/documentation.html

<h1>Getting Started</h1>
<h2>installation</h2>
To use architect.js, simply download the code from github and link the architect.js script inside the /pub/js/architect directory to your HTML file with defer. Add your own script files that use the library after that line with defer.
            
                <!DOCTYPE html>
                <html>
                
                <head>
                    <meta charset="utf-8">
                    <title>my app with architect.js</title>
                </head>
                
                <body>
                    <canvas id="canvas"></canvas>
                    <script defer type="module" src="js/architect/architect.js"></script>
                    <script defer src="js/my_script.js"></script>
                </body>
                
                </html>
            
        
<h2>scene set-up</h2>
To set up your scene, first create a new instance of Architect in your Javascript file. Select the canvas element with its Id, and get the WebGL context. Set up the program, camera, and scene, with the option of lighting, camera angle, field of view, and scene transformation.
            
                // architect instance
                const arch = new Architect();

                // canvas element to display to
                const canvas_1 = document.getElementById("canvas");

                // webgl context for rendering
                const gl_1 = arch.getContext(canvas_1);

                // get program for webgl
                const program_1 = arch.getProgram(gl_1, false);  // falsee for lighting option
                
                // camera for scene
                const camera_1 = new arch.Camera(0, 0);
                
                // scene with intial transformations set
                const scene_1 = new arch.Scene(gl_1, program_1, camera_1, [0, 0, 0], [0, 0, 0], [1, 1, 1]);

            
        
<h2>object creation</h2>
Here are some colour constants we are going to use for our objects. Each array of three corresponds to the rgb values for one face of the block.
            
                // leaf colours
                const c1 = [[59, 24, 24],
                [59, 24, 24],
                [59, 24, 24],
                [59, 24, 24],
                [59, 24, 24],
                [53, 20, 20]]
                
                // trunk colours
                const c2 = [[142, 187, 105],
                [142, 187, 105],
                [142, 187, 105],
                [142, 187, 105],
                [142, 187, 105],
                [142, 187, 105]]
            
        
Next, we initialize our Block objects, with their dimensions, positions, and colours. We add them to the scene we created in the code above. To display the objects on the canvas, simply call updateView() and draw() for the scene.
            
                // create block objects
                const trunk = new arch.Block([50, 70, 50], [0, 0, 0], c1);
                const tree1 = new arch.Block([160, 80, 160], [-50, 70, -50], c2);
                const tree2 = new arch.Block([120, 60, 120], [-30, 150, -30], c2);
                const tree3 = new arch.Block([80, 40, 80], [-10, 210, -10], c2);
                const tree4 = new arch.Block([40, 40, 40], [10, 250, 10], c2);

                // add blocks to scene
                scene_1.addToScene(trunk);
                scene_1.addToScene(tree1);
                scene_1.addToScene(tree2);
                scene_1.addToScene(tree3);
                scene_1.addToScene(tree4);

                // update view of scene
                arch.updateView(scene_1);
                
                // draw scene on canvas
                scene_1.draw();
            
        
<h2>animation</h2>
Currently, our scene is static and we can only view the object from one angle. To animate it, we call requestAnimationFrame and add our animations.
                requestAnimationFrame(drawScenes);
                
                function drawScenes() {
                
                    // update view for scene
                    arch.updateView(scene_1);
                    
                    // draw scene
                    scene_1.draw();
                    
                    // animate scene
                    scene_1.rotateScene([0, 1, 0]);  // rotate along y-axis
                    
                    requestAnimationFrame(drawScenes); // request next frame
                }
