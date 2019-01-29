/**
 * [Vector3.js]
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

/**
 * Just in case I won't find a sane way to clear at least one path,
 * I might implement a "jump" functionality (and a jumpCounter so
 * you won't be able to jump over all the obstacles/walls) ?! 
 *
 * The idea would then be to use 3d coordinates for that..
 */

RR.Vector3 = function( argX, argY, argZ ) {
  
  'use strict';
  
  var _this = this;
  
  // no parseInt, since the value can also be float!
  this.x = 0;
  this.y = 0;
  this.z = 0;
  
  this.magnitude = 0;
  
  this.directionX = 0;
  this.directionY = 0;
  this.directionZ = 0;
  
  this.get = function() {
    return {
      x : _this.x,
      y : _this.y,
      z : _this.z
    };
  };
  
  this.set = function( argX, argY, argZ ) {

    _this.x = argX;
    _this.y = argY;
    _this.z = argZ;

    _this.calculateMagniture();
    _this.calculateDirection();

  };
  
  this.times = function( argValue ) {
    
   _this.x  = ( _this.x * argValue );
   _this.y  = ( _this.y * argValue );
   _this.z  = ( _this.z * argValue );
    
  };

  this.dividedBy  = function( argValue ) {

   _this.x  = ( _this.x / argValue );
   _this.y  = ( _this.y / argValue );
   _this.z  = ( _this.z / argValue );
    
  };
  
  this.add = function( argValue ) {
    
    _this.x += argValue;
    _this.y += argValue;
    _this.z += argValue;
    
  };

  this.substract  = function( argValue ) {
    
    _this.x -= argValue;
    _this.y -= argValue;
    _this.z -= argValue;
    
  };

  // aka "speed"
  this.calculateMagniture = function() {
    
    _this.magnitude = Math.sqrt( ( _this.x * _this.x ) + ( _this.y * _this.y ) + ( _this.z * _this.z ) );
    
  };
  
  this.getMagnitude = function() {
    return _this.magnitude;
  };
  
  this.calculateDirection = function() {
    
    _this.directionX = ( _this.x / _this.magnitude );
    _this.directionY = ( _this.y / _this.magnitude );
    _this.directionZ = ( _this.z / _this.magnitude );
    
  };

  // direction as a kind of normalizing the value to prevend unintentional speed advantages
  // aka "normalized"
  this.getDirection = function( argCalculate ) {
    
    if( 'boolean' === typeof argCalculate && argCalculate ) {
      
      this.calculateDirection();
      
    }

    return {
      x : _this.directionX,
      y : _this.directionY,
      z : _this.directionZ
    };

  };
  
  // Konstructor
  _this.set( argX, argY, argZ );
  
};

