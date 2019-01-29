/**
 * [RR/Game.js]
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

RR.Game = {
    directional : {}
};


RR.Game.playNextLevel = function() {

    'use strict';

    RR.state.level += 1;
    RR.Player.state.lives = 6;

    RR.Game.play();

};

RR.Game.replayLevel = function() {

    'use strict';

    RR.Player.state.lives -= 1;

    if( RR.Player.state.lives < 0 ) {
        alert( "G A M E    O V E R");
        return;
    }

    RR.Game.play();

};

RR.Game.play = function() {

    'use strict';
    
    // Kein LEvel up, dafür leben abziehen!

    RR.Map.ctx.clearRect( 0, 0, RR.Map.canvas.width, RR.Map.canvas.height );
    RR.Map.generateNewMap();
    RR.Player.reset( RR.Player.state.lives );

    RR.Player.clearAll();
    RR.Player.drawSprite();

    RR.Game.updateUi();
    RR.Countdown.start();

};

// @todo own Module
RR.Game.updateUi = function() {

    'use strict';

    RR.el.uiLevel.innerText =  RR.state.level;
    RR.el.uiLives.innerText = RR.Player.state.lives;

};


RR.Game.loop = function() {

    'use strict';

    if( RR.state.isRunning === false ) {
        return;
    }

    /**
     * You -might- have to check everything between the current player position
     * and the next ( level * speed ) position.
     * Otherweise, as soon as (leve*speed) is bigger than the thickness of the walls
     * you end up "going through walls"!
     */
    var nextPos     = new RR.Vector2(
            ( RR.Player.state.pos.x + ( RR.Game.directional[ RR.Player.state.angle ].x * RR.Player.state.speed ) ),
            ( RR.Player.state.pos.y + ( RR.Game.directional[ RR.Player.state.angle ].y * RR.Player.state.speed ) )
        );

    RR.Player.clearSprite();

    RR.Player.state.pos.x = nextPos.x;
    RR.Player.state.pos.y = nextPos.y;

    RR.Player.state.tile.row = Math.floor( RR.Player.state.pos.y / 100 );
    RR.Player.state.tile.col = Math.floor( RR.Player.state.pos.x / 100 );

    // @next @todo COLLISION DETECTION before drawing the sprite
    if( RR.Map.checkCollision( nextPos, RR.Player.state.angle, RR.Player.state.tile.row, RR.Player.state.tile.col ) ) {
        RR.Player.stopEngine();
        alert("BOOM! You've hit a wall!");
        RR.Game.replayLevel();
        return;
    }

    // If player is outside the canvas he/she has won!
    if( RR.Player.state.pos.x > RR.Map.canvas.width ) {
        RR.Player.stopEngine();
        alert( "CONGRATULATIONS!\nYou have mastered this level!");
        // @todo level += 1; lives = 6; speed += ... start countdown
        RR.Game.playNextLevel();
        return;
    }

    RR.Player.drawSprite();

    // run the loop based on the system/browser's animation frame rate
    window.requestAnimationFrame( RR.Game.loop );

};

RR.Game.getNextGridTile = function( argCurrentRow, argCurrentCol, argPlayerAngle ) {

    'use strict';

    var nextRow = ( argCurrentRow + RR.Game.directional[ argPlayerAngle ].y ),
        nextCol = ( argCurrentCol + RR.Game.directional[ argPlayerAngle ].x );

    if(
            nextRow < 0
            || nextCol < 0
            || nextRow >= RR.config.map.rows
            || nextCol >= RR.config.map.cols
    ) {
        return false;
    }

    return {
        row : nextRow,
        col : nextCol
    };

};

RR.Game.init = function() {

    'use strict';

    RR.Game.directional = {
        "0"   : new RR.Vector2( 0, -1 ),
        "90"  : new RR.Vector2( 1, 0 ),
        "180" : new RR.Vector2( 0, 1 ),
        "270" : new RR.Vector2( -1, 0 )
    };

};