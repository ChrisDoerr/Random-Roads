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
