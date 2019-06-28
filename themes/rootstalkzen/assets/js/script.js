/**
 * @file
 * A JavaScript file for the theme.
 */

(function ($) {

  'use strict';

  // Add a js class to the html-tag when JavsScript is active.
  $('html').removeClass('nojs').addClass('js');

})(u);

$(document).ready(function() {
  $( ".blockmenu" ).click(function() {
    var position = $(".blockmenu").css( "left" );
    if( position == "0px" ) {
      $( ".blockmenu" ).transition(
        { left : "-99%" });
    } else {
      $( ".blockmenu" ).transition(
        { left : "0px" });
    }
  });
});
