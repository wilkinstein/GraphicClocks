import React, { Component } from 'react';
import '../../App.css';
import '../../StyleSheets/RoyClock.css';

class RoyClock extends Component {

  constructor() {
    super();
    this.state={
      hours: new Date().getHours().toLocaleString(),
      minutes: new Date().getMinutes().toLocaleString(),
      seconds: new Date().getSeconds().toLocaleString()
    };
  }

  componentDidMount() {

    class AbstractClock {
    
    constructor() {
        if (new.target === AbstractClock) {
            throw new TypeError("Cannot create an instance of an abstract class ['AbstractClock'].")
        }

    }

    /*
     * DrawClock(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs the "drawing" of the clock on the screen (canvas).
     */
    DrawClock(ctx) {
        throw new TypeError("Cannot invoke a method in an abstract class ['AbstractClock.DrawClock()'].");
    }


    /*
     * AdjustToNewWindowSize(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs any (internal) adjustments necessary to adapt to a new screen size.
     */
    AdjustToNewWindowSize(ctx) {
        throw new TypeError("Cannot invoke a method in an abstract class ['AbstractClock.AdjustToNewWindowSize()'].");
    }
    
}

class SimpleClock extends AbstractClock {

    /*
     * constructor(ctx, clockParams)
     *
     * Params:
     *   ctx         - the ("2d") context for the app's canvas.
     *   clockParams - array of clock-specific parameters as follows:
     *                   [0] - the element ID of the (fixed, background) image of the clockface.
     *                   [1] - the background color for the outer part of the clock.
     *                   [2] - the background color for the inner part of the clockface. 
     */
    constructor(ctx, clockParams) {
        super();

        this.backgroundImage = document.getElementById(clockParams[0]);

        if (clockParams[1] == undefined) {
            this.backgroundColor = "#BBB";  // light grey background
        } else {
            this.backgroundColor = clockParams[1];
        }
        if (clockParams[2] == undefined) {
            this.dialColor = "#FFF";  // white
        } else {
            this.dialColor = clockParams[2];
        }

        this.AdjustToNewWindowSize(ctx);
    }


    /*
     * Local Variables
     *
     * Constructor():
     *  this.backgroundImage
     *  this.backgroundColor
     *  this.dialColor
     * 
     * AdjustToNewWindowSize():
     *  this.scaling
     *  this.radius
     *  this.imageX
     *  this.imageY
     *  this.hrad
     *  this.mrad
     *  this.srad
     */

    
    /*
     * DrawClock(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs the "drawing" of the clock on the screen (canvas).
     * 
     * Operation:
     *   First the background/clockface is "drawn", stretching "appropriately" so as to completely fill the canvas.
     *   Then, after determining the "current time",
     */
    DrawClock(ctx) {

        console.log("***  DC      window width  = " + window.innerWidth);
        console.log("***  DC      canvas width  = " + ctx.canvas.width);
        console.log("***  DC      canvas height = " + ctx.canvas.height);
        console.log("***  DC      radius length = " + this.radius);

        //
        // Now "relocate" our (0, 0) reference to center of the canvas.
        // This just makes dealing with angles/coordinates of h/m/s easier to calculate.
        //
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);


        // Draw basic clock face.
        var fill = "#ABC";
        ctx.fillStyle = this.backgroundColor;
        //ctx.fillStyle = "#ABC";
        ctx.fillRect( -ctx.canvas.width / 2, -ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height );
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.dialColor;
        ctx.fill();

        // Put background image in the middle of it.  Stretch to fill the height of the canvas.
        var stretch = ctx.canvas.height;
        ctx.drawImage(this.backgroundImage, this.imageX, this.imageY, stretch, stretch);

        var time = new Date();
        var msec = time.getMilliseconds();
        var secs = time.getSeconds();
        var mins = time.getMinutes();
        var hrs = time.getHours();  hrs = ( hrs > 12 ? (hrs - 12) : hrs );

        // Display digital time in center of clock
        ctx.font = "30px Calibri";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        var secStr = ( secs < 10 ? "0" + secs : secs );
        var minStr = ( mins < 10 ? "0" + mins : mins );
        var timeStr = hrs + ":" + minStr + ":" + secStr;
        ctx.fillText(timeStr, 0, 0);

        // h/m/s dots?

        //
        // Get coordinates of the h/m/s dots.  (Based on "0" at 12:00, so "unrotate" the 'straight' calculation by 1/2 PI.)
        //
        var secRads = ( (2 * Math.PI) * ( secs + (msec/1000) ) / 60 ) - (0.5 * Math.PI);
        var minRads = ( (2 * Math.PI) * ( mins + (secs/60) ) / 60 ) - (0.5 * Math.PI);
        var hrRads  = ( (2 * Math.PI) * ( hrs + (mins/60) + (secs/3600) ) / 12 ) - (0.5 * Math.PI);
        var secCoords = { x: Math.cos(secRads) * this.radius, y: Math.sin(secRads) * this.radius };
        var minCoords = { x: Math.cos(minRads) * this.radius, y: Math.sin(minRads) * this.radius };
        var hrCoords  = { x: Math.cos(hrRads) * this.radius,  y: Math.sin(hrRads) * this.radius };

        // Draw the line(s) connecting the dots.  (The dots that have not yet been drawn.)
        ctx.beginPath();
        ctx.lineCap = "butt";
        ctx.moveTo(hrCoords.x, hrCoords.y);
        ctx.lineTo(minCoords.x, minCoords.y);
        ctx.lineTo(secCoords.x, secCoords.y);
        ctx.closePath();
        ctx.lineWidth = 6 * this.scaling;
        ctx.strokeStyle = "black";
        ctx.stroke();


        //
        // Test - pile up dots at ~6:00
        //

        ctx.beginPath();  // First the (large, red) hour dot.
        ctx.arc(0, this.radius / 2, this.hrad, 0, (2 * Math.PI));
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2 * this.hrad;
        ctx.stroke();
        ctx.beginPath();  // Then the (medium, blue) minute dot.
        ctx.arc(0, this.radius / 2, this.mrad, 0, (2 * Math.PI));
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2 * this.mrad;
        ctx.stroke();
        ctx.beginPath();  // Finally the (small, yellow) second dot.
        ctx.arc(0, this.radius / 2, this.srad, 0, (2 * Math.PI));
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2 * this.srad;
        ctx.stroke();

        //
        // End Test - pile up dots at ~6:00
        //


        /////
        //
        // Now draw H/M/S dots with H/M/S-centered letters.
        //
        /////

        var fontStyle = "bold ";
        var fontSize = "12px ";
        var fontName = "Calibri";
        ctx.textBaseline = "middle";
        ctx.font = fontStyle + fontSize + fontName;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        
        var scl = 2 * ctx.canvas.height / 900;
        //
        // Hour dot
        //
        ctx.translate(hrCoords.x, hrCoords.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.hrad, 0, (2 * Math.PI));
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2 * this.hrad;
        ctx.stroke();
        ctx.save();
        ctx.font = fontStyle + "14px " + fontName;
        ctx.scale(scl, scl);
        ctx.fillText("H", 0, 0);
        ctx.restore();
        ctx.translate(-hrCoords.x, -hrCoords.y);
        //
        // Minute dot
        //
        ctx.translate(minCoords.x, minCoords.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.mrad, 0, (2 * Math.PI));
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2 * this.mrad;
        ctx.stroke();
        ctx.font = fontStyle + "10px " + fontName;
        ctx.save();
        ctx.scale(scl, scl);
        ctx.fillText("M", 0, 0);
        ctx.restore();
        ctx.translate(-minCoords.x, -minCoords.y);
        //
        // Seconds dot
        //
        ctx.translate(secCoords.x, secCoords.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.srad, 0, (2 * Math.PI));
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2 * this.srad;
        ctx.stroke();
        ctx.font = fontStyle + "8px " + fontName;
        ctx.save();
        ctx.scale(scl, scl);
        ctx.fillText("S", 0, 0);
        ctx.restore();
        ctx.translate(-secCoords.x, -secCoords.y);


        // Draw "seconds" arc
        ctx.beginPath();
          //ctx.arc(0, 0, this.radius / 2, 0, ((( secs + (msec/1000) ) * 2 * Math.PI) / 60));  // Smooth seconds
        ctx.arc(0, 0, this.radius / 2, (-.5 * Math.PI), ((secs * 2 * Math.PI) / 60) -  (.5 * Math.PI) );
        ctx.strokeStyle = "green";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw radius line to seconds' arc.
        ctx.lineWidth = 5;
        ctx.strokeStyle = "purple";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo( secCoords.x / 2, secCoords.y / 2 );
        ctx.stroke();

        // Clear???
        ctx.beginPath();
        ctx.closePath();


        /////
        //
        // End - H/M/S in hour-sized dots.
        //
        /////

        // "Undo" relocation
        ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);

    }  // end Draw()



    /*
     * AdjustToNewWindowSize(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs any (internal) adjustments necessary to adapt to a new screen size.
     */
    AdjustToNewWindowSize(ctx) {
        
        console.log("***** SimpleClock.AdjustToNewWindowSize() called. *****");

        this.scaling = ctx.canvas.height / 900;  // Shortest dimension determines scaling factor.

        this.radius = (ctx.canvas.height / 2) * 0.73;

        // Image stretching?
        var stretchFactor = ctx.canvas.height / this.backgroundImage.height;
        this.imageX = -(this.backgroundImage.width / 2) * stretchFactor;
        this.imageY = -(this.backgroundImage.height / 2) * stretchFactor;
        
        // Dot sizes?
        this.hrad = this.radius / 40;
        this.mrad = this.radius / 55;
        this.srad = this.radius / 75;

    }  // end AdjustToNewWindowSize()
    
}  // end class SimpleClock

class BaseClock extends AbstractClock {

    /*
     * constructor(ctx, clockParams)
     *
     * Params:
     *   ctx         - the ("2d") context for the app's canvas.
     *   clockParams - array of clock-specific parameters as follows:
     *                   [0] - the desired variant of this BaseClock.
     *                       : 0 - hand only moves on the second (so "jerky").
     *                       : 1 - hand moves on every "tick" (so "smooth").
     *                       : 2 - hand moves "smoothly".  Length changes "long-to-short" and "short-to-long" every second.
     *                       : 3 - hand moves "smoothly".  Length changes from "normal" to "widest" by 3:00/9:00.
     *                   [1] - the background color for the clock.
     *                   [2] - the background color for the inner part of the clockface. 
     *                   [3] - the color for the numbers part of the clockface. 
     *                   [4] - the color for the clock "hand". 
     */
    constructor(ctx, clockParams) {
        super();

        this.variant = clockParams[0];

        if (clockParams[1] === undefined) {
            this.backgroundColor = "#BBB";  // light grey background
            console.log("Param #1 undefined");
        } else {
            this.backgroundColor = clockParams[1];
        }
        if (clockParams[2] === undefined) {
            this.dialColor = "#FFF";  // white
            console.log("Param #2 undefined");
        } else {
            this.dialColor = clockParams[2];
        }
        if (clockParams[3] === undefined) {
            this.numRingColor = "#333";  // ???
            console.log("Param #3 undefined");
        } else {
            this.numRingColor = clockParams[3];
        }

        if (clockParams[4] === undefined) {
            this.handColor = "green";
            console.log("Param #4 undefined");
        } else {
            this.handColor = clockParams[4];
        }

        console.log("variant = " + this.variant);
        console.log("params = " + clockParams);
        console.log("back/dial/ring colors = " + this.backgroundColor + this.dialColor + this.numRingColor);
        
        this.AdjustToNewWindowSize(ctx);
    }


    /*
     * Local Variables
     *
     * Constructor():
     *  this.variant
     *  this.backgroundColor
     *  this.dialColor
     *  this.numRingColor
     *  this.handColor
     * 
     * AdjustToNewWindowSize():
     *  this.scaling
     *  this.dialLineWidth
     *  this.outerRing
     *  this.innerRing
     *  this.dialRingColor
     *  this.tickLen
     *  this.tickWidth
     *  this.radius
     * 
     *  this.handWidth
     *  this.centerDotSize
     */



    /*
     * DrawClock(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs the "drawing" of the clock on the screen (canvas).
     */
    DrawClock(ctx) {

        // Translate context so (0,0) is in the center of the canvas.
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);


        // First, draw the fixed clockface.
        this.DrawClockface(ctx);

        //
        // Get the seconds and draw the seconds hand.
        //
        var time = new Date();
        var msecs = time.getMilliseconds();
        var secs = time.getSeconds();


        if (this.variant == 0) {
            // Only move "on the second".
            msecs = 0;
        }

        var rads = ((secs + (msecs / 1000)) * (2 * Math.PI) / 60) - (.5 * Math.PI);  // Rotate "back" 90 degrees to 0 == 12:00.

        var xCos = Math.cos(rads);
        var ySin = Math.sin(rads);

        // Get length of hand.
        var coords = this.GetHandCoordinates(secs, msecs, rads);

        console.log("===== Hand coords = (" + coords.x + ", " + coords.y + ")");
        console.log("===== Hand length = " + Math.sqrt( coords.x ** 2 + coords.y ** 2 ));

        var xsec = coords.x;
        var ysec = coords.y;
        console.log("X = " + xsec);
        console.log("Y = " + ysec);

        // First draw black outline.
        ctx.beginPath()
        ctx.lineWidth = (this.handWidth + 6 * this.scaling);
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.lineTo(xsec, ysec);
        ctx.stroke();

        ctx.beginPath()
        ctx.lineWidth = this.handWidth;
        ctx.strokeStyle = this.handColor;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.lineTo(xsec, ysec);
        ctx.stroke();


        // Undo the translation (to center of canvas).
        ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);

    }  // end DrawClock()



    /*
     * DrawClockface(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context, already "translated" so that (0, 0) is at the center of the canvas.
     * 
     * Function:
     *   This routine performs the drawing of the (fixed) basic clock.  This does _not_ include any h/m/s indicators.
     *   It is assumed that this context has already been translated so (0, 0) is in the center of the clockface.
     */
    DrawClockface(ctx) {

        // First the clockface colors
        // Do them in "layers" - background, outer dial, inner dial

        ctx.lineWidth = this.dialLineWidth;
        ctx.strokeStyle = this.dialRingColor;

        // Draw the (basic) background color.
        ctx.beginPath();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect( -ctx.canvas.width / 2, -ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height );
        ctx.stroke();

        // Easiest to color "all" of the circle out to the edge of the numbers ring and _then_ overlay the center dial.
        ctx.beginPath();
        ctx.arc(0, 0, this.outerRing, 0, 2 * Math.PI);
        ctx.fillStyle = this.numRingColor;
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, this.innerRing, 0, 2 * Math.PI);
        ctx.fillStyle = this.dialColor;
        ctx.fill();
        ctx.stroke();

        // Draw outer ring.
        ctx.beginPath();
        ctx.arc(0, 0, this.outerRing, 0, (2 * Math.PI));
        ctx.stroke();

        // Draw inner ring
        ctx.beginPath();
        ctx.arc(0, 0, this.innerRing, 0, (2 * Math.PI));
        ctx.stroke();

        // Add tick marks around dial
        var tickRads = 2 * Math.PI / 60;
        var savecap = ctx.lineCap;
        var ticklength,
            tickwidth;
        ctx.lineCap = "round";
        for ( var i = 0 ; i < 60 ; i++ ) {
            // Draw tick mark.
            ctx.beginPath();
            ctx.lineCap = "round";
            if ( (i % 5) == 0 ) {
                // This is a "digit point"
                ticklength = 2 * this.tickLen;
                tickwidth = 2 * this.tickWidth;
            } else {
                // Ordinary tick point
                ticklength = this.tickLen;
                tickwidth = this.tickWidth;
            }
            ctx.moveTo( this.innerRing - ticklength, 0 );
            ctx.lineWidth = tickwidth;
            ctx.lineTo( this.innerRing, 0);
            ctx.stroke();
            // Rotate to next tick location.
            ctx.rotate(tickRads);
        }
        ctx.lineCap = savecap;

        // And, finally, the numbers around the dial
        var digitRads = 2 * Math.PI / 12;
        var rads = (-.5 * Math.PI) + digitRads;  // This will be our starting angle - 1:00 o'clock.
        var digitRadius = (this.outerRing + this.innerRing) / 2;
        //var x, y;
        var fontStyle = "bold ";
        var fontSize = 48 * this.scaling;
        var fontSizePX = fontSize + "px ";
        var fontName = "Calibri";
        ctx.font = fontStyle + fontSizePX + fontName;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "black";
        for ( var i = 1 ; i <= 12 ; i++ ) {
            x = digitRadius * Math.cos(rads);
            y = digitRadius * Math.sin(rads);
            ctx.fillText(i, x, y);
            rads += digitRads;
        }

        // _And_ the "center dot"
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(0, 0, this.centerDotSize,  0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();

    }  // end DrawClockface()



    /*
     * GetHandCoordinates(seconds, milliseconds)
     *
     * Params:
     *   seconds      - the time.seconds for which calculations should be performed.
     *   milliseconds - the time.milliseconds for which calculations should be performed.
     *   radians      - the angle of the hand (from 12:00).
     *
     * Returns:
     *   "coords" - the (x, y) coordinates of the hand for the specified time.
     * 
     * Function:
     *   This routine determines the length of the hand for the specified time and calculates the appropriate (x, y)
     *   coordinates of the (end of) the hand, based on the variant of the clock.
     */
    GetHandCoordinates(seconds, milliseconds, radians) {

        // For some variants, the hand length doesn't change, so just calculate the (x, y) coordinates for the fixed radius.
        if ( (this.variant == 0) || (this.variant == 1) ) {
            // Variants 0 & 1:  The hand size remains unchanged.
            
            var xCos = Math.cos(radians);
            var ySin = Math.sin(radians);
            var xsec = xCos * this.radius;
            var ysec = ySin * this.radius;

            return { x: xsec , y: ysec };

        } else if ( this.variant == 2 ) {
            // Variant == 2:  Every second, hand either grows to "radius" or shrinks to "zero".

            // Are we growing or shrinking?
            //   We'll shrink from "radius" to zero during the even seconds.
            //   We'll grow from zero to "radius" during the odd seconds.
            var newRadius;
            var radiusFactor = ( milliseconds / 1000);
            if ( (seconds % 2) == 0 ) {
                // This is an "even" second.  We're shrinking from "radius" to zero.
                newRadius = this.radius - (this.radius * radiusFactor);
            } else {
                // This is an "odd" second.  We're growing from zero to "radius".
                newRadius = this.radius * radiusFactor;
            }
            
            var xCos = Math.cos(radians);
            var ySin = Math.sin(radians);
            var xsec = xCos * newRadius;
            var ysec = ySin * newRadius;

            return { x: xsec , y: ysec };

        } else if ( this.variant == 3 ) {
            // Variant == 3:  Hand expands/contracts from "radius" (at 12:00/6:00) to "canvas.width" (at 3:00/9:00) and back.
            //                Path of hand follows an ellipse.  Given an ellipse with Max(x) = "a" and Max(y) = "b" ...
            //                Formula for hand radius at any given angle is:
            //                    r(angle) = b / SQRT(1 - (e cos(angle)**2))   ["e" = Euler's number, base of natural logs]

            //                Formula for "y" is:  y = x tan(angle);
            //                    "    "  "x" is:  x = +/- (a * b) / SQRT( b**2 + ((a**2) * tan(angle)**2) )
            //                                     ... with "+" if -PI/2 < angle < PI/2

            var a = (.99 * ctx.canvas.width / 2);  // Max "x" extension  (not _quite_ "canvas.width")
            var b = this.radius;  // Minimum "y" extension - the "normal" 12:00/6:00 extension.
            var tanRads2 = Math.tan(radians) ** 2;
            var sqrtFactor = b**2  + ( a**2 * tanRads2);
            var xval = (a * b) / Math.sqrt(sqrtFactor);
            if ( (radians > Math.PI/2) && (radians < 3*Math.PI/2) ) {
                xval = -xval;
            }
            var yval = xval * Math.tan(radians);

            return { x: xval, y: yval };

        } else {
            // Unknown.  Just use "nothing".
            return { x: 0, y: 0 };
        }

    }  // end GetHandCoordinates()


    /*
     * AdjustToNewWindowSize(ctx)
     *
     * Params:
     *   ctx - the canvas' 2D rendering context
     * 
     * Function:
     *   This routine performs any (internal) adjustments necessary to adapt to a new screen size.
     */
    AdjustToNewWindowSize(ctx) {

        this.scaling = ctx.canvas.height / 900;  // Shortest dimension determines scaling factor.

        this.dialLineWidth = 6 * this.scaling;

        this.outerRing = (ctx.canvas.height / 2) - (.5 * this.dialLineWidth);
        this.innerRing = .85 * this.outerRing;
        this.dialRingColor = "black";

        this.tickLen = 8 * this.scaling;
        this.tickWidth = .5 * this.dialLineWidth;
        
        this.radius = this.innerRing - (.5 * this.dialLineWidth);

        this.handWidth = 12 * this.scaling;
        this.centerDotSize = 1.2 * this.handWidth;
        
        console.log("=*=*=*= dialLineWidth/handWidth = " + this.dialLineWidth + "/" + this.handWidth);

    }

}

    var x, y;


    /*
     * function GetCanvasSize()
     *
     * Returns - [ canvasHeight, canvasWidth ] - the appropriate dimensions of the canvas.
     * 
     * Function:
     *   This routine determines the size of the window and determines the appropriate dimensions
     *    for the canvas so as to maximally fill the window while still maintaining a 6x19 format.
     */
    function GetCanvasSize() {

        console.log("***** GetCanvasSize() called. *****");
        
        // What's the window size?  (We'll need to adjust canvas size appropriately.)

        var viewPortWidth;
        var viewPortHeight;

        // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        } else if (typeof document.documentElement != 'undefined'
            &&  typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
            // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
            viewPortWidth = document.documentElement.clientWidth;
            viewPortHeight = document.documentElement.clientHeight;
        } else {
            // older versions of IE
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
        }

        // Now have initial working values for canvas.  (Start with window size and adjust.)

        var canvasHt = 0;
        var canvasWd = 0;
        
        console.log("Window ht/wd = " + viewPortHeight + "/" + viewPortWidth + "   Browser ht? = "+ window.outerHeight);
        
        // We want a 9x16 ratio.
        if ( 16 * (viewPortHeight / 9) > viewPortWidth ) {
            // The width is the "restraining" factor.  Adjust ht/wd to use the max width.
            canvasHt = (viewPortWidth / 16) * 9;
            canvasWd = viewPortWidth;
        } else {
            // The height is the "restraining" factor.  Adjust ht/wd to use the max height.
            canvasHt = viewPortHeight;
            canvasWd = (viewPortHeight / 9) * 16;
        }
        
        return [ canvasHt, canvasWd ];

    }  // end GetCanvasSize()



    /////
    //
    // Resize window handling
    //
    /////

    /*
     * function AdjustToNewWindowSize(canvas, ctx)
     *
     * Function:
     *   This routine is used to react to the change in size of the browser window.
     *   It adjusts the canvas as necessary to "fit" the new window size.
     *   It also invokes the 'AdjustToNewWindowSize()' methods of all existing/instantiated clocks.
     */
    function AdjustToNewWindowSize(canvas, ctx) {

        console.log("***** AdjustToNewWindowSize() called. *****");

        // We have a new window size.  What are the new canvas dimensions?
        var retval = GetCanvasSize();
        var canvasHt = retval[0];
        var canvasWd = retval[1];

        // Set canvas ht/wd
        ctx.canvas.height = canvasHt;
        ctx.canvas.width = canvasWd;
        canvas.height = canvasHt;
        canvas.width = canvasWd;

        // Now call all "active" clocks to adjust their sizes, too.
        for ( var i = 0 ; i < activeClocksArray.length ; i++ ) {
            activeClocksArray[i].AdjustToNewWindowSize(ctx);
        }
        currentClock.AdjustToNewWindowSize(ctx);

    }  // end AdjustToNewWindowSize()



    // We'll want to react to changes in the window size.
    function ResizeWindowHandler() {
        
        console.log("***** LocalAdjustWindow() called. *****");
        
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        AdjustToNewWindowSize(canvas, ctx);
    }

    var resizeTimeoutID;
    function ResizeThrottler() {

        // Wait 1/20th of a second (20fps) until calling LocalAdjustWindow()
        clearTimeout(resizeTimeoutID);
        resizeTimeoutID = setTimeout( LocalAdjustWindow, 50);
        /*
        // ignore resize events as long as LocalAdjustWindow() execution is in the queue
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout( function() { resizeTimeout = null; LocalAdjustWindow(); }, 66);  // 15fps
        }
        */
    }

    // We'll want to react to changes in the window size.
    function LocalAdjustWindow() {
        
        console.log("***** LocalAdjustWindow() called. *****");
        
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        AdjustToNewWindowSize(canvas, ctx);
    }


    function AddWindowResizeHandler() {
        window.addEventListener( "resize", ResizeThrottler, false );
    }

    /////
    //
    // End - Resize window handling
    //
    /////



    /////
    //
    // Mouse click handling
    //
    /////


    function ChangeClock(dir) {

        var indexChange = 1;
        if (dir == "left") {
            // clock list index "delta" will be negative.
            indexChange = -indexChange;
        }

        var index = activeClocksIndex + indexChange;
        if (index < 0) {
            index = activeClocksArray.length - 1;
        } else if (index >= activeClocksArray.length) {
            index = 0;
        }
        activeClocksIndex = index;
        currentClock = activeClocksArray[activeClocksIndex];
    }


    function HandleMouseDownEvent(evt) {
        if (evt.button != 0) {
            // We only deal with the left mouse click - "button == 0"
            return;  // Not left mouse click
        } else {
            // We got a left mouse click.  Where is it?
            x = evt.offsetX;
            y = evt.offsetY;
            //alert("Click (" + x + ", " + y);

            if (x < (canvas.width / 2)) {
                // This is on the left-side of the canvas.  Move the next clock to the "left" (lower index);
                ChangeClock("left");
            } else {
                // This is on the right-side of the canvas.  Move the next clock to the "right" (higher index);
                ChangeClock("right");
            }
        }
    }


    function AddMouseClickHandler(canvas) {
        canvas.addEventListener("mousedown", function(evt) {
            HandleMouseDownEvent(evt);
        });
    }

    /////
    //
    // End - Mouse click handling
    //
    /////

    //
    // Get screen particulars and adjust canvas appropriately.
    //

    // By default, black out the "entire" window.
    document.body.style.background = "black";

    // What's the window size?  Adjust canvas appropriately.
    var retval = GetCanvasSize();
    var canvasHt = retval[0];
    var canvasWd = retval[1];

    // Adjust canvas position?

    var canvas = document.getElementById("canvas");

    var ctx = canvas.getContext("2d");


    console.log("canvas top/left = " + canvas.style.top + "/" + canvas.style.left);

    // Set canvas ht/wd
    ctx.canvas.height = canvasHt;
    ctx.canvas.width = canvasWd;
    canvas.height = canvasHt;
    canvas.width = canvasWd;


    /////
    //
    // Resize window handling
    //
    /////

    AddWindowResizeHandler();

    AddMouseClickHandler(canvas);

    /*

    var resizeTimeoutID;
    function ResizeThrottler() {

        // Wait 1/20th of a second (20fps) until calling LocalAdjustWindow()
        clearTimeout(resizeTimeoutID);
        resizeTimeoutID = setTimeout( LocalAdjustWindow, 50);
        /*
        // ignore resize events as long as LocalAdjustWindow() execution is in the queue
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout( function() { resizeTimeout = null; LocalAdjustWindow(); }, 66);  // 15fps
        }
        */
    /*
    }

    // We'll want to react to changes in the window size.
    function LocalAdjustWindow() {
        
        console.log("***** LocalAdjustWindow() called. *****");
        
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");

        AdjustToNewWindowSize(canvas, ctx);
    };

    window.addEventListener( "resize", ResizeThrottler, false );
    */

    /////
    //
    // End - Resize window handling
    //
    /////


    var activeClocksArray = [];
    var activeClocksIndex = -1;


    //
    // Create and run SimpleClock(s)
    //

    // Preload clockface image.

    var backgroundColor = ctx.fillStyle;

    var backgroundColors = [ "#ABC", "#F5F", "#3A7" ];
    var dialColors       = [ "#FFF", "#ECD" ];


    //
    // Build "all" clocks
    //

    //
    // Normally when creating a clock we'd need to check that a clock doesn't already exist,
    // but since this app is still very incomplete and these are the only clocks,
    // and they're _all_ being created "all-at-once" at the same time,
    // we'll just add them (sequentially) to the array of instantiated clocks.
    //

    var simpleClockParams = [];
    var newClock;
    for ( var i = 0 ; i < backgroundColors.length ; i++ ) {
        for ( var j = 0 ; j < dialColors.length ; j++ ) {
            simpleClockParams = [ "clockface", backgroundColors[i], dialColors[j] ];
            console.log("Clock #" + (activeClocksIndex + 1) + ":  backColor: " + backgroundColors[i] + "  dialColor: " + dialColors[j]);
            newClock = new SimpleClock( ctx, simpleClockParams );
            activeClocksArray.push(newClock);
        }
    }

    //
    // We'll need a clock "driver" to periodically call the "current" clock in the current context.
    //
    activeClocksIndex = 0;
    var currentClock = activeClocksArray[activeClocksIndex];
    currentClock = new BaseClock(ctx, [ 3 , "#F5F", "#ECD", "#8FF", "#080" ]);
    currentClock = activeClocksArray[5];
    function DrawCurrentClock() {
        
        console.log("*******  window     width = " + window.innerWidth + "  *****");
        console.log("*******  canvas     width = " + canvas.width);
        console.log("*******  ctx.canvas width = " + ctx.canvas.width);

        currentClock.DrawClock(ctx);
    }

    var timerMillisecInterval = 50;
    var timerID = setInterval(DrawCurrentClock, timerMillisecInterval);

  }

  render() {

    
    return (
      <div>
        <div>
        <img id="clockface" src="./data/circles2circletrans320.png" width="320" height="320" style={{display:"none"}}/>
        <img id="starclock" src="./data/starclock320.png" width="320" height="320" style={{display:"none"}}/>
        </div>
    
      <canvas id="canvas" width="1600" height="900" style={{backgroundColor:"#ABC"}} ></canvas>

      <canvas id="bgCanvas" width="320" height="320" style={{backgroundColor:"#8FF", display:"none"}} ></canvas>
      </div>
    );
  }
}

export default RoyClock;
