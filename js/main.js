var map;
var marker = [];
// Dictionary of locations and names for ice cream places
var locations = [
  {x: 34.070052, y: -118.405832, name: "Amorino Gelato", rating: "4", description: "Experience here was wonderful. They have quick service and give you many flavors. They even make your gelato into a rose shape."},
  {x: 34.076231, y: -118.348461, name: "Milk", rating: "3", description: "Macaron ice cream sandwich is much bigger than most places, but would say their ice cream is average."},
  {x: 34.055722, y: -118.442067, name: "Saffron & Rose Ice Cream", rating: "5", description: "Really great texture. The ice cream is Persian ice cream, so it is gooey. The flavors are wonderful, especially considering they are floral flavors. Definitely recommend."},
  {x: 34.076059, y: -118.323389, name: "Salt & Straw", rating: "3", description: "Had very interesting flavors. Came when they had their fermentation series. Would recommend for those seeking exciting flavors, but quality wise, it was only average."},
  {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery", rating: "4", description: "Sweet Rose has lots of very interesting flavors, such as basil ice cream. Their ice cream is extremely rich and creamy, but they are definitely on the pricier side."},
  {x: 34.069378, y: -118.443281, name: "UCLA", rating: "5", description: "I go to school here."}

  ];

function initMap() {

  // Setting up the map
  var mapProp = {
    center: {lat: locations[0].x, lng: locations[0].y},
    zoom: 13,
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

//  var marker = [];
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

// Function to show name, review, and rating when an option from the select tags have been chosen
function changeSelection() {
  var selectBox = document.getElementById("stores");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  panToMarker(selectedValue);

  var storeFront = document.getElementById("store-names");
  storeFront.innerHTML = locations[selectedValue].name;

  var writing = document.getElementById("reviews");
  writing.innerHTML = locations[selectedValue].description;

  var stars = document.getElementById("ratings");
  stars.innerHTML = locations[selectedValue].rating;

  (function openInfoWindow() {
    google.maps.event.trigger(marker[selectedValue], 'click');
  })();
}

// Function to display options in select tag in alphabetical order
(function sortStores() {
    var options = $('select.stores option');
    var arr = options.map(function(_, o) {
        return {
            t: $(o).text(),
            v: o.value
        };
    }).get();
    arr.sort(function(o1, o2) {
        return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
    });
    options.each(function(i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
    });
})();


// Loading the map
google.maps.event.addDomListener(window, 'load', initialize);
