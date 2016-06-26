function initialize() {
  // Make into array of locations for ice cream places
  var locations = [
    {x: 34.069378, y: -118.443281, name: "UCLA"},
    {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery"} //sweet rose
    ];

  var mapProp = {
    center: {lat: locations[0].x, lng: locations[0].y},
    zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    streetViewControl: false, //no pegman for street view
    scrollWheel: false
  };

  var map = new google.maps.Map(document.getElementById("google-map"), mapProp);

  function addMarker(index) {
    var marker = new google.maps.Marker({
      position: {lat: locations[index].x, lng: locations[index].y},
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: locations[index].name
    });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    })
  }
  addMarker(0);
  addMarker(1);
}

google.maps.event.addDomListener(window, 'load', initialize);
