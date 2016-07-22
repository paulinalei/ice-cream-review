var map;

// Dictionary of locations and names for ice cream places
var locations = [
  {x: 34.069378, y: -118.443281, name: "UCLA", rating: "5", description: "math math math"},
  {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery", rating: "4", description: "sweet sweet"}
  ];

function initialize() {

  // Setting up the map
  var mapProp = {
    center: {lat: locations[0].x, lng: locations[0].y},
    zoom: 15,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    streetViewControl: false, //no pegman for street view
    scrollWheel: false
  };

/* attachInfoWindow() function binds InfoWindow to a Marker
 * Creates InfoWindow instance if it does not exist already
 * @param InfoWindow options to set content and other things
 */
 google.maps.Marker.prototype.attachInfoWindow = function (options){
   var mapping= this.getMap();
   mapping.infowindow = mapping.infowindow || new google.maps.InfoWindow();
   google.maps.event.addListener(this, 'click', function () {
     mapping.infowindow.setOptions(options);
     mapping.infowindow.open(mapping, this);
   });
   mapping.infoWindowClickShutter = mapping.infoWindowClickShutter ||
   google.maps.event.addListener(mapping, 'click', function () {
     mapping.infowindow.close();
   });
 }

 /* attachName() function binds name to a Marker
  * @param name is the name from locations dictionary
  */
 google.maps.Marker.prototype.attachName = function(name) {
   var mapping = this.getMap();
   google.maps.event.addListener(this, 'click', function() {
     var storeFront = document.getElementById("store-names");
     storeFront.innerHTML = name;
   })
 }

/* attachReview() function binds a review to a Marker
 * @param review is the review from the locations dictionary
 */
 google.maps.Marker.prototype.attachReview = function(review) {
   var mapping = this.getMap();
  google.maps.event.addListener(this, 'click', function() {
    var writing = document.getElementById("reviews");
    writing.innerHTML = review;
  });
 }

/* attachRating() function binds a rating to a Marker
 * @param rating is the rating from the locations dictionary
 */
 google.maps.Marker.prototype.attachRating = function(star) {
   var mapping = this.getMap();
   google.maps.event.addListener(this, 'click', function () {
     var stars = document.getElementById("ratings");
     stars.innerHTML = star;
   })
 }

  // Getting element in html to display the map
  map = new google.maps.Map(document.getElementById("google-map"), mapProp);

  var marker = [];
  for (var i = 0; i < locations.length; i++) {
      marker[i] = new google.maps.Marker({
      position: {lat: locations[i].x, lng: locations[i].y},
      map: map
    });
    marker[i].attachInfoWindow({content: locations[i].name});
    marker[i].attachName(locations[i].name);
    marker[i].attachReview(locations[i].description);
    marker[i].attachRating(locations[i].rating); // idk why the rating shows up as red
  }
}

// TODO: maybe make this more efficient, so don't have to add function to like every item
function panToMarker(index) {
  var position = new google.maps.LatLng(locations[index].x, locations[index].y);
  map.panTo(position);
}

// Loading the map
google.maps.event.addDomListener(window, 'load', initialize);
