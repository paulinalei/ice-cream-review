function initialize() {
  // Make into array of locations for ice cream places
  var location = {
    lat: 34.069378,
    lng: -118.443281
    /*
    sweet rose creamery
    x: 34.076360,
    y: -118.354860*/
  }
  var mapProp = {
    center: location,
    zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    streetViewControl: false, //no pegman for street view
    scrollWheel: false
  };
  var map = new google.maps.Map(document.getElementById("google-map"), mapProp);

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'wassup'
  });


}
google.maps.event.addDomListener(window, 'load', initialize);
