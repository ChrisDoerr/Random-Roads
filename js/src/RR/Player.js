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