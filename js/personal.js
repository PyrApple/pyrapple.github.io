/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  // mechanism to avoid kick back on safari to hide navbar even on scroll up
  var showNavBar =  ( prevScrollpos > currentScrollPos) || ( currentScrollPos <= 10 )
  // show / hide navbar
  if ( showNavBar ) {
    document.getElementById("mainNav").style.top = "0";
  } else {
    document.getElementById("mainNav").style.top = "-60px";
  }
  prevScrollpos = currentScrollPos;
}