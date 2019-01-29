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