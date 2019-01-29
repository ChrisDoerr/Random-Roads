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
