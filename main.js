function initialize() {
  // Make into array of locations for ice cream places
  var location = {
    x: 34.069378,
    y: -118.443281
    /*
    sweet rose creamery
    x: 34.076360,
    y: -118.354860*/
  }
  var mapProp = {
    center:new google.maps.LatLng(location.x,location.y),
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    streetViewControl: false, //no pegman for street view
    scrollWheel: false
  };
  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);
