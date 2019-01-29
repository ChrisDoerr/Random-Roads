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

