/*
   * Helper function to convert a number to the graph coordinate
   * ----------------------------------------------------------- */
import React, {useEffect, useRef} from "react";

function convertToGraphCoord(g, num) {
    return (g.height / 2) * -(num * g.scaleFactor) + g.height / 2;
}

/*
 * Constructor for the Graph object
 * ----------------------------------------------------------- */
const CanvasDrawer = (canvas, datacb) => {
    const requestRef = React.useRef();

    let g = this;
    g.canvas          =   canvas;
    g.context         =   canvas.getContext('2d');
    g.width           =   200;
    g.height          =   200;
    g.white_out       =   g.width * 0.01;
    g.fade_out        =   g.width * 0.15;
    g.fade_opacity    =   0.2;
    g.current_x       =   0;
    g.current_y       =   0;
    g.erase_x         =   null;
    g.speed           =   2;
    g.linewidth       =   1;
    g.scaleFactor     =   1;
    g.stop_graph      =   false;

    g.plethStarted    =   false;
    g.plethBuffer     =   [];

    /*
     * The call to fill the data buffer using
     * the data callback
     * ---------------------------------------- */
    g.fillData = function() {
        g.plethBuffer = datacb();
    };


    /*
     * The call to start the ging
     * ---------------------------------------- */
    g.start = function() {
        // Recursive call to do animation frames
        if (!g.stop_graph) {
            requestRef.current = requestAnimationFrame(g.start);
        }
        // We need to fill in data into the buffer so we know what to draw
        g.fillData();
        // Draw the frame (with the supplied data buffer)
        g.draw();
    };


    g.draw = function() {
        // Circle back the draw point back to zero when needed (ring drawing)
        g.current_x = (g.current_x > g.width) ? 0 : g.current_x;

        // "White out" a region before the draw point
        for( i = 0; i < g.white_out ; i++){
            g.erase_x = (g.current_x + i) % g.width;
            g.context.clearRect(g.erase_x, 0, 1, g.height);
        }

        // "Fade out" a region before the white out region
        for( i = g.white_out ; i < g.fade_out ; i++ ){
            g.erase_x = (g.current_x + i) % g.width;
            g.context.fillStyle="rgba(255, 255, 255, " + g.fade_opacity.toString() + ")";
            g.context.fillRect(g.erase_x, 0, 1, g.height);
        }

        // If this is first time, draw the first y point depending on the buffer
        if (!g.started) {
            g.current_y = convertToGraphCoord(g, g.plethBuffer[0]);
            g.started = true;
        }

        // Start the drawing
        g.context.beginPath();

        // We first move to the current x and y position (last point)
        g.context.moveTo(g.current_x, g.current_y);

        for (i = 0; i < g.plethBuffer.length; i++) {
            // Put the new y point in from the buffer
            g.current_y = convertToGraphCoord(g, g.plethBuffer[i]);

            // Draw the line to the new x and y point
            g.context.lineTo(g.current_x += g.speed, g.current_y);

            // Set the
            g.context.lineWidth   = g.linewidth;
            g.context.lineJoin    = "round";

            // Create stroke
            g.context.stroke();
        }

        // Stop the drawing
        g.context.closePath();
    };

    return true;
}

export { convertToGraphCoord, CanvasDrawer};
