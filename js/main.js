function initialize() {
  // Dictionary of locations and names for ice cream places
  var locations = [
    {x: 34.069378, y: -118.443281, name: "UCLA"},
    {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery"} //sweet rose
    ];

  // Setting up the map
  var mapProp = {
    center: {lat: locations[0].x, lng: locations[0].y},
    zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    streetViewControl: false, //no pegman for street view
    scrollWheel: false
  };

  // Getting element in html to display the map
  var map = new google.maps.Map(document.getElementById("google-map"), mapProp);

  /*
  * Function to add markers
  * index corresponds to the index in the locations dictionary
  * infowindow displays name of the store when marker is clicked on
  */

  function addMarker(index) {
    var marker = new google.maps.Marker({
      position: {lat: locations[index].x, lng: locations[index].y},
      map: map
    });

    var infowindow = new google.maps.InfoWindow({
      content: locations[index].name
    });
    var clickedWindows = [];
    google.maps.event.addListener(marker, 'click', function() {

      infowindow.open(map, marker);

      var personalReviews = ["UCLA boelter", "sweet sweet"]
      var writing = document.getElementById("reviews");
      writing.innerHTML = personalReviews[index];
    })
  }

  // Adding markers -> could turn this into a for loop if you wanted to
  // use locations.length for for loop
  addMarker(0);
  addMarker(1);
}

// Loading the map
google.maps.event.addDomListener(window, 'load', initialize);
