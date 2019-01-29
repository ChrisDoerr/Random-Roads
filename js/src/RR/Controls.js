/**
 * [RR/Controls.js]
 */
/*jslint
  browser,
  devel,
  multivar,
  for,
  this,
  single,
  long,
  white,
  bitwise
*/
/*global window,Image,RR*/
/*jshint
  scripturl : true,
  esversion : 6
*/

/**
 * The vehicle will always drive on its own.
 * The player has to use the keys  W-A-S-D to 
 * navigate through the labyrinth.
 */

RR.Controls = {};

RR.Controls.handleKeyDown = function( event ) {

    'use strict';

    event.preventDefault();

    var keyCode = event.keyCode;

    switch( keyCode ) {

        // Key D => right
        case 68:
            // @question how to resolve Player dependency? Neccessary?
            if( RR.Player.state.angle === 0 ) {
                RR.Player.rotateClockwise();
            }
            else if( RR.Player.state.angle === 180 ) {
              RR.Player.rotateAntiClockwise();
            }
            break;
    
        // Key A => left
        case 65:
            if( RR.Player.state.angle === 180 ) {
                RR.Player.rotateClockwise();
            }
            else {
                RR.Player.rotateAntiClockwise();
            }
            break;
    
        // Key S => down
        case 83:
            if( RR.Player.state.angle === 90 ) {
                RR.Player.rotateClockwise();
            }
            else if( RR.Player.state.angle === 270 ) {
                RR.Player.rotateAntiClockwise();
            }
            break;
    
        // Key W => up
        case 87:
            if( RR.Player.state.angle === 90 ) {
                RR.Player.rotateAntiClockwise();
            }
            else if( RR.Player.state.angle ===  270 ) {
                RR.Player.rotateClockwise();
            }
            break;
    
    }

};

RR.Controls.init = function() {

    'use strict';

    window.addEventListener( 'keydown', RR.Controls.handleKeyDown, false );

};