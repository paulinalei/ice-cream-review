function initialize() {
  // Dictionary of locations and names for ice cream places
  var locations = [
    {x: 34.069378, y: -118.443281, name: "UCLA"},
    {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery"}
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

    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {

      infowindow.setContent(locations[index].name);
      infowindow.open(map, marker);

      var personalReviews = [ {description: "UCLA boelter", rating: "5"}, {description: "sweet sweet", rating: "4"}]
      var writing = document.getElementById("reviews");
      writing.innerHTML = personalReviews[index].description;
      var stars = document.getElementById("ratings");
      stars.innerHTML = personalReviews[index].rating;
    })
  }

  // Adding in markers for each location in locations dictionary
  for (var i = 0; i < locations.length; i++)
  {
    addMarker(i);
  }
}

// Loading the map
google.maps.event.addDomListener(window, 'load', initialize);
