/**
 * [RR.js]
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
/*global window*/
/*jshint
  scripturl : true,
  esversion : 6
*/

var spritesheetTilesDefault = {
  "tiles" : [
    {
      fromX   : 0,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 0,
      right   : 0,
      bottom  : 1,
      left    : 1,
      hitboxes : [
        {
          fromX : 0,
          fromY : 45,
          toX   : 55,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 45,
          toX   : 55,
          toY   : 100
        }
      ]
    },
    {
      fromX   : 100,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 0,
      right   : 1,
      bottom  : 0,
      left    : 1,
      hitboxes : [
        {
          fromX : 0,
          fromY : 45,
          toX   : 100,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 200,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 0,
      right   : 1,
      bottom  : 1,
      left    : 0,
      hitboxes : [
        {
          fromX : 45,
          fromY : 45,
          toX   : 100,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 45,
          toX   : 55,
          toY   : 100
        }
      ]
    },
    {
      fromX   : 300,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 0,
      right   : 1,
      bottom  : 1,
      left    : 1,
      hitboxes : [
        {
          fromX : 0,
          fromY : 45,
          toX   : 100,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 45,
          toX   : 55,
          toY   : 100
        }
      ]
    },
    {
      fromX   : 400,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 0,
      bottom  : 0,
      left    : 1,
      hitboxes : [
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 55
        },
        {
          fromX : 0,
          fromY : 45,
          toX   : 55,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 500,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 0,
      bottom  : 1,
      left    : 0,
      hitboxes : [
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 100
        }
      ]
    },
    {
      fromX   : 600,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 0,
      bottom  : 1,
      left    : 1,
      hitboxes : [
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 100
        },
        {
          fromX : 0,
          fromY : 45,
          toX   : 55,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 700,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 1,
      bottom  : 0,
      left    : 0,
      hitboxes : [
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 45,
          toX   : 100,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 800,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 1,
      bottom  : 0,
      left    : 1,
      hitboxes : [
        {
          fromX : 0,
          fromY : 45,
          toX   : 100,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 900,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 1,
      bottom  : 1,
      left    : 0,
      hitboxes : [
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 100
        },
        {
          fromX : 45,
          fromY : 45,
          toX   : 100,
          toY   : 55
        }
      ]
    },
    {
      fromX   : 1000,
      fromY   : 0,
      width   : 100,
      height  : 100,
      top     : 1,
      right   : 1,
      bottom  : 1,
      left    : 1,
      hitboxes : [
        {
          fromX : 0,
          fromY : 45,
          toX   : 100,
          toY   : 55
        },
        {
          fromX : 45,
          fromY : 0,
          toX   : 55,
          toY   : 100
        }
      ]
    }
  ]
};

var spritesheetVehicleDefault = {
  "vehicle" : [
    {
      fromX   : 0,
      fromY   : 0,
      width   : 25,
      height  : 25,
      hitboxes : []
    }
  ]
};


var RR = {
  el    : {},
  ctx   : {},
  state : {
    // Game is running => vehicle is (automatically) moving
    isRunning : false,
    // Level will be used to calculate/increase vehicle speed
    level   : 1
  }
};

RR.parseDOM = function() {
  
  'use strict';
  
  RR.el.countdown     = document.getElementById('CountDown');
  
  RR.el.messageBox    = document.getElementById('MessageBox');
  RR.el.btnStartGame  = document.getElementById('BtnStartTheGame');

  RR.el.canvasFloor   = document.getElementById('Map-Floor');
  RR.el.canvasPlayer  = document.getElementById('Map-Player');
  
  RR.ctx.floor        = RR.el.canvasFloor.getContext('2d');
  RR.ctx.player       = RR.el.canvasPlayer.getContext('2d');
  
  RR.el.uiLevel       = document.getElementById('PlayerLevelValue');
  RR.el.uiLives       = document.getElementById('PlayerLivesValue');

};

// @question Maybe also on window resize?!
RR.resizeCanvases = function() {

  'use strict';

  // Tiles are 100x100, maybe also via setting?!
  var width   = ( RR.config.map.cols * 100 ),
      height  = ( RR.config.map.rows * 100 );

  RR.el.canvasFloor.setAttribute( 'width', width );
  RR.el.canvasFloor.setAttribute( 'height', height );

  RR.el.canvasPlayer.setAttribute( 'width', width );
  RR.el.canvasPlayer.setAttribute( 'height', height );

};

// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range#answer-1527820
// min = inclusive, max = exclusive(!)
RR.getRandomInt = function( argMin, argMax ) {
  
  'use strict';

  var min = Math.ceil( argMin );
  var max = Math.floor( argMax );
  
  return ( Math.floor( Math.random() * ( max - min + 1 ) ) + min );
  
};


RR.inRange = function( value, min, max ) {

  'use strict';

  return ( value >= min && value <= max );
  
};

RR.rectanglesIntersect = function( rect1, rect2 ) {

  'use strict';

  // Check if the rectanges do NOT intersect and negate the result!
  // https://www.youtube.com/watch?v=wx0nyomRS_U
  return !(
    rect2.fromX > rect1.toX       // [2:36] Fig.1
    || rect2.fromY > rect1.toY    // [2:36] Fig.2
    || rect2.toY < rect1.fromY    // [2:36] Fig.3
    || rect2.toX < rect1.fromX    // [2:36] Fig.4
  );

};


RR.setup = function() {

  'use strict';

  RR.resizeCanvases();

  RR.Map.init(
      RR.el.canvasFloor,
      RR.ctx.floor,
      RR.Sprites.stack.tiles,
      RR.config.map.rows,
      RR.config.map.cols
  );

  RR.Player.init(
    RR.el.canvasPlayer,
    RR.ctx.player,
    RR.Sprites.stack.vehicle
  );

  // @todo move to GAME.js oder so
  RR.Map.generateNewMap();
  RR.Player.drawSprite();

  RR.Game.init();

  RR.Controls.init();

  RR.Countdown.init(
    RR.el.countdown,
    RR.el.canvasFloor.width,
    RR.el.canvasFloor.height,
    RR.Player.startEngine
  );

  RR.el.btnStartGame.addEventListener('click', RR.handleBtnStartGame );

};

RR.handleBtnStartGame = function( event ) {


  'use strict';

  event.preventDefault();
  
  RR.el.messageBox.classList.add('hide');

  RR.Countdown.start();

};

RR.init = function( argGameConfig ) {

  'use strict';
  
  if( !( 'object' === typeof argGameConfig ) ) {
    console.log( 'Critical Error: Missing Game Configuration!' );
    return false;
  }

  // @todo parse argGameConfig properly!!
  RR.config = argGameConfig;
  
  // (Otional) DEV MODE
  if( 'boolean' === typeof RR.config.isDevMode ) {
    RR.isDevMode = RR.config.isDevMode;
  }

  // Parse DOM for elements
  RR.parseDOM();

  // Load sprites before doing anything else
  RR.Sprites.load( RR.config.sprites, RR.setup );
  
};




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



/**
 * [RR/Countdown.js]
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

RR.Countdown = {
  element       : {},
  canvasWidth   : 0,
  canvasHeight  : 0,
  callback      : {},
  interval      : {},
  value         : 0
};

RR.Countdown.centerElement = function() {

  'use strict';

  RR.Countdown.element.style.left = ( ( RR.Countdown.canvasWidth / 2 ) - ( RR.Countdown.element.offsetWidth / 2 ) ) + "px";
  RR.Countdown.element.style.top  = ( ( RR.Countdown.canvasHeight / 2 ) -( RR.Countdown.element.offsetHeight / 2 ) )  + "px";

};

RR.Countdown.hide = function() {

  'use strict';

  RR.Countdown.element.classList.add( 'hide' );

};
RR.Countdown.show = function() {

  'use strict';

  RR.Countdown.element.innerText = RR.Countdown.value;

  RR.Countdown.element.classList.remove( 'hide' );

  RR.Countdown.centerElement();

};

RR.Countdown.start = function() {

    'use strict';
    
    RR.Countdown.reset();
    RR.Countdown.show();

    RR.Countdown.interval = setInterval( RR.Countdown.run, 1000 );

};
RR.Countdown.run = function() {

  'use strict';

  RR.Countdown.value -= 1;

  if( RR.Countdown.value < 0 ) {

    RR.Countdown.stop( true );

  }
  else {

    RR.Countdown.element.innerText = RR.Countdown.value;

  }

};

RR.Countdown.stop = function( argCallCallback ) {
  
  'use strict';

    var callCallback = ( 'boolean' === typeof argCallCallback ? argCallCallback : false );

  clearInterval( RR.Countdown.interval  );

  RR.Countdown.hide();

  if( callCallback && ( 'function' === typeof RR.Countdown.callback )  )  {

    RR.Countdown.callback();

  }

};

RR.Countdown.reset = function() {

  'use strict';

  RR.Countdown.value = 5;

};

RR.Countdown.init = function( argElement, argCanvasWidth, argCanvasHeight, argCallback ) {

  'use strict';

  RR.Countdown.element      = argElement;

  RR.Countdown.canvasWidth  = argCanvasWidth;
  RR.Countdown.canvasHeight = argCanvasHeight;

  RR.Countdown.callback     = argCallback;

  RR.Countdown.centerElement();

};




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




/**
 * [RR/Map.js]
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

RR.Map = {
    canvas              : {},
    ctx                 : {},
    sprite              : {},
    // @question via config?!
    floorColor          : "#4eba04",
    wallColor           : "#404040",
    borderWidth         : 20,
    // will be newly generated for each MATCH!
    tileIndexPool       : [],
    dimTiles            :  0,
    tileMap             : [],
    borderCollisionMap  : [],
    collisionMap        : [],
    maxRows             : 0,
    maxCols             : 0
};

// This WAS used to draw the start and finish tile
// Not any more...
// But maybe this (or a modified version) can be used
// to clear passeges so that each map is acually winnable.
RR.Map.drawEmptyTile = function( argRow, argCol ) {

    'use strict';
    
    RR.Map.ctx.fillStyle = RR.Map.floorColor;
    RR.Map.ctx.fillRect( ( argRow * 100 ), ( argCol * 100 ), 100, 100 );
  
};
  
RR.Map.drawOuterBorder = function() {
    
    'use strict';
    
    RR.Map.ctx.strokeStyle  = RR.Map.wallColor;
    RR.Map.ctx.lineWidth    = RR.Map.borderWidth;
    
    RR.Map.ctx.strokeRect( 0, 0, RR.Map.canvas.width, RR.Map.canvas.height );
    
};

// Drawing start and finish is meant to increase the chance you can even start and finish :)
RR.Map.drawFinish = function() {

    'use strict';

    var lastTile = {
        fromX   : ( ( RR.config.map.cols -1 ) * 100 ),
        fromY   : ( ( RR.config.map.rows -1 ) * 100 ),
        toX     : ( 100 - ( RR.Map.borderWidth / 2 ) ),
        toY     : ( 100 - ( RR.Map.borderWidth / 2 ) )
    };

    // Finish
    RR.Map.ctx.fillStyle = RR.Map.floorColor;

    // das Rechteck etwas kleiner machen, damit am unteren Ende, durch die outer border,
    // die Map geschlossen bleibt, während am rechten Rand (^^) ein Ausgang offen bleibt!
    // Last Tile
    RR.Map.ctx.fillRect(
        lastTile.fromX,
        lastTile.fromY,
        lastTile.toX,
        lastTile.toY
    );
    // Breaking through the outer wall in the right side of the last tile
    RR.Map.ctx.fillRect(
        ( lastTile.fromX + lastTile.toX ),
        lastTile.fromY,
        ( RR.Map.borderWidth / 2 ),
        ( 100 -40) // Tile height minus "guessed" value for the opening
    );
    
};

RR.Map.drawStart = function() {
    
    'use strict';

    // Start Tile
    RR.Map.ctx.fillStyle = RR.Map.floorColor;
    RR.Map.ctx.fillRect( 0, 0, 100, 100 );
    
};

RR.Map.generatTilePool = function() {

    'use strict';

    var totalGridItems  = ( RR.config.map.rows * RR.config.map.cols ),
        totalTiles      = RR.Map.sprite.data.length,
        i               = 0;

    // Reset
    RR.Map.tileIndexPool = [];

    for( i = 0; i < totalGridItems; i += 1 ) {

        RR.Map.tileIndexPool.push( RR.getRandomInt( 0, ( totalTiles -1 ) ) );
        
    }

};

RR.Map.drawTile = function( argRow, argCol, argTile ) {

    'use strict';

    RR.Map.ctx.drawImage(
        RR.Map.sprite.img,
        argTile.fromX, argTile.fromY,
        argTile.width, argTile.height,
        ( argCol * 100 ), ( argRow * 100 ),
        100, 100
    );

};

RR.Map.drawMap = function() {

    'use strict';

    var col = 0,
        row = 0;

    for( row = 0; row < RR.Map.maxRows; row += 1 ) {

        for( col = 0; col < RR.Map.maxCols; col += 1 ) {

            RR.Map.drawTile( row, col, RR.Map.tileMap[ row ][ col ] );

        }
    }

};

RR.Map.generateTileMap = function() {

    'use strict';

    var row = 0,
        col = 0;

    // Reset old map
    RR.Map.tileMap = [];

    for( row = 0; row < RR.Map.maxRows; row += 1 ) {

        RR.Map.tileMap[ row ] = {};

        for( col = 0; col < RR.Map.maxCols; col += 1 ) {

            RR.Map.tileMap[ row ][ col ] = RR.Map.sprite.data[ RR.getRandomInt( 0, ( RR.Map.dimTiles -1 ) ) ];

        }

    }
    
};


RR.Map.generateCollisionMap = function() {

    'use strict';

    var row = 0,
        col = 0;

    // Reset old collision maps
    RR.Map.borderCollisionMap   = [];
    RR.Map.collisionMap         = [];

    /**
     * The OUTER BORDER is always a collision trigger.
     * .. except for the exit at the bottom right!
     */
    // Border Top
    RR.Map.borderCollisionMap.push({
        fromX   : 0,
        fromY   : 0,
        toX     : RR.Map.canvas.width,
        toY     : ( RR.Map.borderWidth / 2 ) // @question why is borderWidth=20 actually 10px?
    });
    // Border Left
    RR.Map.borderCollisionMap.push({
        fromX   : 0,
        fromY   : 0,
        toX     : ( RR.Map.borderWidth / 2 ),
        toY     : RR.Map.canvas.height
    });
    // Border Bottom
    RR.Map.borderCollisionMap.push({
        fromX   : 0,
        fromY   : ( RR.Map.canvas.height - ( RR.Map.borderWidth / 2 ) ),
        toX     : ( RR.Map.canvas.width - 100 ),
        toY     : RR.Map.canvas.height
    });
    // Border Right p1 (the opening is a bit smaller than the full tile!)
    RR.Map.borderCollisionMap.push({
        fromX   : ( RR.Map.canvas.width - ( RR.Map.borderWidth / 2 ) ),
        fromY   : 0,
        toX     : RR.Map.canvas.width,
        toY     : ( RR.Map.canvas.height -100 )
    });
    // Border Right p2 (the opening is a bit smaller than the full tile!)
    RR.Map.borderCollisionMap.push({
        fromX   : ( RR.Map.canvas.width - ( RR.Map.borderWidth - 2 ) ),
        fromY   : ( RR.Map.canvas.height - 40 ),
        toX     : RR.Map.canvas.width,
        toY     : RR.Map.canvas.height
    });


    /**
     * Now generate a grid based collision map for each tile
     */
    for( row = 0; row < RR.Map.maxRows; row += 1 ) {

        RR.Map.collisionMap[ row ] = {};

        // The START and FINISH tiles will always be cleared
        // and only the border rules apply there.
        for( col = 1; col < ( RR.Map.maxCols -1 ); col += 1 ) {

            RR.Map.collisionMap[ row ][ col ] = [];

            RR.Map.tileMap[ row ][ col ].hitboxes.forEach( function( hitbox ) {

                // Add all collision rects for a grid tile
                // but with "converting" its relative to absolute values.
                let collisionRect = {
                    fromX   : ( hitbox.fromX + ( col * 100 ) ),
                    fromY   : ( hitbox.fromY + ( row * 100 ) ),
                    toX     : ( hitbox.toX + (col * 100 ) ),
                    toY     : ( hitbox.toY + row * 100 )
                };

                // Add ALL (fixed) collision rectangles to the map
                RR.Map.collisionMap[ row ][ col ].push( collisionRect );

            });

        }

    }

};


// @*Überlegung: Collisionsabgfragen quasi an jeden Canvas binden, als in desssen Handler Module implementierem
RR.Map.checkCollision = function( argPos, argAngle, argRow, argCol ) {

    'use strict';

    var currentTile     = {
            row : argRow,
            col : argCol
        },
        nextTile            = RR.Game.getNextGridTile( currentTile.row, currentTile.col, argAngle ),
        currentPos          = argPos,
        playerHitbox        = {},
        playerHalfWidth     = ( ( RR.Player.sprite.data[0].width / 2 ) -5 ),
        playerHalfHeight    = ( ( RR.Player.sprite.data[0].height / 2 ) -5 ),
        nextPos             = new RR.Vector2(0,0),
        collisionPool       = [],
        dimCollisionPool    = 0,
        i                   = 0;

    /**
     * Compile a (shorter) compile map so you don't have to check ALL (impossible) tiles as well?!
     */

    // The border shall always be checked
    collisionPool.push.apply( collisionPool, RR.Map.borderCollisionMap );
    
    // Current grid tile collision map
    collisionPool.push.apply( collisionPool, RR.Map.collisionMap[ currentTile.row ][ currentTile.col ] );

    // If there is a next grid tile, also get its collision map.
    if( false !== nextTile ) {

        // Also check the collision map for the next tile
        collisionPool.push.apply( collisionPool, RR.Map.collisionMap[ nextTile.row ][ nextTile.col ] );

    }

// @todo @next
// Darauf achten, dass currentPos im ZENTRUM des Player Sprites liegt!
// Geprüft werden muss aber das gesamte Player Tile, bzw dessen HITBOX(en)

    playerHitbox.fromX  = ( currentPos.x - playerHalfWidth );
    playerHitbox.toX    = ( currentPos.x + playerHalfWidth );

    playerHitbox.fromY  = ( currentPos.y - playerHalfHeight );
    playerHitbox.toY    = ( currentPos.y + playerHalfHeight );

    dimCollisionPool = collisionPool.length;

    for( i = 0; i < dimCollisionPool; i += 1 ) {

        // POINT collision
        /*
        if(
            RR.inRange( currentPos.x, collisionPool[i].fromX, collisionPool[i].toX )
            && RR.inRange( currentPos.y, collisionPool[i].fromY, collisionPool[i].toY )
        ) {
            return true;
        }
        */
       // HITBOX (rect) COLLISION
       if( RR.rectanglesIntersect( collisionPool[i], playerHitbox ) ) {

        if( RR.isDevMode ) {
        
            // console.log(collisionPool[i], playerHitbox);

            RR.Map.ctx.strokeStyle  = "#FFFFFF";
            RR.Map.ctx.lineWidth    = 1;
            RR.Map.ctx.fillStyle    = "transparent";
            RR.Map.ctx.strokeRect(
                collisionPool[i].fromX,
                collisionPool[i].fromY,
                ( collisionPool[i].toX - collisionPool[i].fromX ),
                ( collisionPool[i].toY - collisionPool[i].fromY )
            );
            RR.Map.ctx.strokeStyle = "#AA0000";
            RR.Map.ctx.strokeRect(
                playerHitbox.fromX,
                playerHitbox.fromY,
                ( playerHitbox.toX - playerHitbox.fromX ),
                ( playerHitbox.toY - playerHitbox.fromY )
            );
        }

        RR.Player.drawSprite();

        return true;
        
    }

    }

    return false;
    
};

RR.Map.generateNewMap = function() {

    'use strict';

//    RR.Map.generatTilePool();


    RR.Map.generateTileMap();

    RR.Map.generateCollisionMap();

    
    
    RR.Map.drawMap();
    RR.Map.drawStart();
    RR.Map.drawOuterBorder();
    RR.Map.drawFinish();

};

RR.Map.init = function( argCanvas, argCtx, argSprite, argRows, argCols ) {

    'use strict';

    RR.Map.canvas   = argCanvas;
    RR.Map.ctx      = argCtx;

    RR.Map.sprite   = argSprite;

    RR.Map.dimTiles = RR.Map.sprite.data.length;

    RR.Map.maxRows  = argRows;
    RR.Map.maxCols  = argCols;
  
  
    //@todo via argument
    if( 'string' === typeof RR.config.map.floorColor ) {
      RR.Map.floorColor = RR.config.map.floorColor;
    }

};



/**
 * [RR/Player.js]
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

RR.Player = {
    canvas  : {},
    ctx     : {},
    sprite  : {},
    state   : {}
};

RR.Player.clearSprite = function() {

    'use strict';
    
    RR.Player.ctx.clearRect(
        ( RR.Player.state.pos.x - RR.Player.sprite.halfWidth ), ( RR.Player.state.pos.y - RR.Player.sprite.halfHeight ),
        RR.Player.sprite.img.width, RR.Player.sprite.img.height
    );

};

RR.Player.clearAll = function() {
    
    'use strict';

    RR.Player.ctx.clearRect( 0, 0, RR.Player.canvas.width, RR.Player.canvas.height );

};

RR.Player.drawSprite = function() {

    'use strict';

    var angle       = ( RR.Player.state.angle * Math.PI / 180 ),
        translateX  = ( RR.Player.state.pos.x ),
        translateY  = ( RR.Player.state.pos.y );

    RR.Player.ctx.translate( translateX, translateY );
    RR.Player.ctx.rotate( angle );

    /**
     * In order to rotate around its own center ( objWdith/2, objHeight/2 )
     * the vehicle sprite has to be translated a) to a new NULL point,
     * and then moves back w/2 and h/2 so the image center is in the newly
     * translated NULL point.
     */
    RR.ctx.player.drawImage(
        RR.Sprites.stack.vehicle.img,
        0, 0,
        RR.Player.sprite.data[0].width, RR.Player.sprite.data[0].height,
        ( -RR.Player.sprite.halfWidth ), ( -RR.Player.sprite.halfHeight ),
        RR.Player.sprite.img.width, RR.Player.sprite.img.height 
    );

    // Now back to neutral
    RR.Player.ctx.rotate( -angle );
    RR.Player.ctx.translate( -translateX, -translateY );

};

RR.Player.changeAngle = function( argAngle ) {

    'use strict';

    // added value + 360 so you will always have positive values
    // the modulo makes sure that's is always between 0-359
    RR.Player.state.angle = ( ( RR.Player.state.angle + argAngle + 360 ) % 360 );

};


RR.Player.rotateClockwise = function() {

    'use strict';

    RR.Player.clearSprite();

    RR.Player.changeAngle( RR.Player.state.angularSpeed );

    RR.Player.drawSprite();

};


RR.Player.rotateAntiClockwise = function() {

    'use strict';

    RR.Player.clearSprite();

    RR.Player.changeAngle( -RR.Player.state.angularSpeed );

    RR.Player.drawSprite();

};


RR.Player.startEngine = function() {

    'use strict';

    RR.state.isRunning = true;

    RR.Game.loop();
};

RR.Player.stopEngine = function() {

    'use strict';

    RR.state.isRunning = false;

};


RR.Player.reset = function( argLives ) {

    'use strict';

    RR.Player.state = {
        // More or less in the middle of the start tile
        pos             : new RR.Vector2( ( 100 / 4 ), ( 100 / 4 ) ),
        tile            : {
            row :0,
            col :0
        },
        angle           : 90,
        // degrees per "rotation change event"
        angularSpeed    : 90,
        speed           : ( 1 + ( RR.state.level * 0.25 ) ),
        lives           : ( 'number' === typeof argLives ? argLives : 5 )
    };

    // @todo RR.UI.updateGameState() oder so--- oder das separiern?!

};

RR.Player.init = function( argCanvas, argContext, argVehicleSprite ) {

    'use strict';
    
    RR.Player.canvas                = argCanvas;
    RR.Player.ctx                   = argContext;
    RR.Player.sprite                = argVehicleSprite;

    RR.Player.sprite.halfWidth      = ( RR.Player.sprite.data[0].width / 2 );
    RR.Player.sprite.halfHeight     = ( RR.Player.sprite.data[0].height / 2 );

    RR.Player.reset();

};





/**
 * [RR/Sprites.js]
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

RR.Sprites = {
  stack       : {},
  stackTotal  : 0,
  stackIndex  : 0,
  callback    : {}
};

RR.Sprites.countUpStack = function() {

  'use strict';

  RR.Sprites.stackIndex += 1;

  if( ( RR.Sprites.stackIndex >= RR.Sprites.stackTotal ) && ( 'function' === typeof RR.Sprites.callback ) )  {

    RR.Sprites.callback();

  }

};

RR.Sprites.load = function( argSprites, argCallback ) {
  
  'use strict';
  
  if( !( 'object' === typeof argSprites ) ) {
    console.log( '[Error] Missing Or Invalid Argument' );
    return false;
  }

  var slugs       = Object.keys( argSprites ),
      i           = 0;

  RR.Sprites.stackTotal = slugs.length;

  // The callback (if a function) will be called when all the stack items have been loaded.
  if( 'function' === typeof argCallback ) {
    RR.Sprites.callback = argCallback;
  }
      
  // add sprites to stack
  for( i = 0; i < RR.Sprites.stackTotal; i += 1 ) {

    RR.Sprites.stack[ slugs[i] ]        = {};

    RR.Sprites.stack[ slugs[i] ].data   =  argSprites[ slugs[i] ].data[ slugs[i] ];

    RR.Sprites.stack[ slugs[i] ].img    = new Image();

    RR.Sprites.stack[ slugs[i] ].img.addEventListener( 'load', RR.Sprites.countUpStack );

    RR.Sprites.stack[ slugs[i] ].img.src = argSprites[ slugs[i] ].image;
    
  }

};




/**
 * [Vector2.js]
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
/*global window,RR*/
/*jshint
  scripturl : true,
  esversion : 6
*/

RR.Vector2 = function( argX, argY ) {
  
  'use strict';
  
  var _this = this;
  
  // no parseInt, since the value can also be float!
  this.x = 0;
  this.y = 0;
  
  this.magnitude = 0;
  
  this.directionX = 0;
  this.directionY = 0;
  
  this.get = function() {
    return {
      x : _this,
      y : _this
    };
  };
  
  this.set = function( argX, argY ) {

    _this.x = argX;
    _this.y = argY;

    _this.calculateMagniture();
    _this.calculateDirection();

  };
  
  this.times = function( argValue ) {
    
   _this.x  = ( _this.x * argValue );
   _this.y  = ( _this.y * argValue );
    
  };

  this.dividedBy  = function( argValue ) {

   _this.x  = ( _this.x / argValue );
   _this.y  = ( _this.y / argValue );
    
  };
  
  this.add = function( argValue ) {
    
    _this.x += argValue;
    _this.y += argValue;
    
  };

  this.substract  = function( argValue ) {
    
    _this.x -= argValue;
    _this.y -= argValue;
    
  };

  // aka "speed"
  this.calculateMagniture = function() {
    
    _this.magnitude = Math.sqrt( ( _this.x * _this.x ) + ( _this.y * _this.y ) );
    
  };
  
  this.getMagnitude = function() {
    return _this.magnitude;
  };
  
  this.calculateDirection = function() {
    
    _this.directionX = ( _this.x / _this.magnitude );
    _this.directionY = ( _this.y / _this.magnitude );
    
  };

  // direction as a kind of normalizing the value to prevend unintentional speed advantages
  // aka "normalized"
  this.getDirection = function( argCalculate ) {
    
    if( 'boolean' === typeof argCalculate && argCalculate ) {
      
      this.calculateDirection();
      
    }

    return {
      x : _this.directionX,
      y : _this.directionY
    };

  };
  
  // Konstructor
  _this.set( argX, argY );
  
};











