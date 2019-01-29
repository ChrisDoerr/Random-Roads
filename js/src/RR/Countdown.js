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