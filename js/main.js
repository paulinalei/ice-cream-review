var map;
var marker = [];
// Dictionary of locations and names for ice cream places
var locations = [
  {x: 33.688016, y: -117.834099, name: "Afters Ice Cream", rating: "4", description: "Really good milky buns, which is donut with ice cream. Not too sweet in my opinion. Definitely pricey though."},
  {x: 34.070052, y: -118.405832, name: "Amorino Gelato", rating: "4", description: "Experience here was wonderful. They have quick service and give you many flavors. They even make your gelato into a rose shape."},
  {x: 34.040172, y: -118.429481, name: "Atticus Creamery & Pies", rating: "4", description: "Ice cream is good and creamy. Have really unique flavors worth getting. Wouldn't say the same about the pies."},
  {x: 33.598383, y: -117.871457, name: "B.CANDY", rating: "5", description: "Known to be one of the best ice cream places in Orange County, B.CANDY really deserves this title. Definitely recommend everyone come here. One of the best."},
  {x: 37.338871, y: -121.995191, name: "Baskin Robbins", rating: "2", description: "It's alright. A staple ice cream company. Good enough, but there are much better places."},
  {x: 37.333052, y: -121.884916, name: "Ben & Jerry's", rating: "2", description: "Good enough for a craving, but not the best ice cream quality. Might as well just buy a tub from the supermarket and take that to eat."},
  {x: 33.748516, y: -117.866474, name: "Chunk-N-Chip", rating: "3", description: "All of their ice cream has some kind of solid food chunks inside, which I didn't particularly like. However, their ice cream is very creamy. Come if you like chunky ice cream."},
  {x: 34.023555, y: -118.394562, name: "Cold Stone Creamery", rating: "2", description: "Fun to watch them mix your ice cream, but quality of ice cream not that great. Also, felt very expensive"},
  {x: 34.064145, y: -118.306198, name: "CottonHi", rating: "4", description: "Love the concept of ice cream with cotton candy. Would say that the cotton candy isnt the best and that it felt overpriced."},
  {x: 37.447769, y: -122.159694, name: "CREAM", rating: "1", description: "Got an ice cream sandwich. Ice cream was hard. Cookies were hard. Overpriced."},
  {x: 34.063298, y: -118.399391, name: "Creamistry", rating: "3", description: "Nitrogen ice cream, but ice cream consistency can vary greatly. Really good flavors and customizing, but very expensive for a scoop."},
  {x: 33.745920, y: -117.961660, name: "Eiswelt Gelato", rating: "3", description: "Very cute gelato in the form of animal heads. Gelato is creamy but melts so fast. Quite pricey for the size."},
  {x: 33.707032, y: -117.783469, name: "Hamada-ya", rating: "2", description: "They have soft serve matcha but it's weirdly icy. One good thing is that they hadd Cinnamon Toast Crunch, which tastes really good with the ice cream."},
  {x: 33.831791, y: -117.911602, name: "Han's Homemade Ice Cream", rating: "4", description: "Really good homemade ice cream. Well done flavors. Cheaper than most places."},
  {x: 37.753064, y: -122.412204, name: "Humphry Slocombe", rating: "5", description: "Yes. I love this place. Very few flavors, but all of them are so unique and different. Secret breakfast is one of my favorite flavors ever."},
  {x: 33.658036, y: -118.001192, name: "Mangiamo Gelato Caffe", rating: "3", description: "The gelato is okay. I've had better. Scoop size is really small for the price."},
  {x: 36.982153, y: -122.021928, name: "Marianne's Ice Cream", rating: "4", description: "Also a great ice cream place in Santa Cruz, but can be very crowded. They have so many flavors it's crazy. Super creamy and worth coming here."},
  {x: 37.315166, y: -121.978010, name: "Matcha Love", rating: "4", description: "Really good tea-inspired soft serve. Recommend the hojicha flavor. Creamy and cheap."},
  {x: 34.419749, y: -119.698853, name: "McConnell's Fine Ice Creams", rating: "4", description: "Lots of unique flavors. Very creamy ice cream. Somewhat of a long line, but very worth."},
  {x: 34.076231, y: -118.348461, name: "Milk", rating: "3", description: "Macaron ice cream sandwich is much bigger than most places, but would say their ice cream is average."},
  {x: 33.706242, y: -117.784080, name: "Mochilato", rating: "3", description: "Mochilato is mochi filled with gelato. Gelato is extremely creamy considering it's inside a freezer all day. However, very expensive for a small mochi."},
  {x: 36.975046, y: -122.027838, name: "The Penny Ice Creamery", rating: "4", description: "Really good ice cream with flavors that change all the time. Would say their cone is better than most. They offer toasted marshmallow as a topping and is worth getting."},
  {x: 34.028804, y: -118.499446, name: "Rori's Artisanal Creamery", rating: "5", description: "One of the best ice cream places. So many flavors, so creamy. Very unique store."},
  {x: 34.055722, y: -118.442067, name: "Saffron & Rose Ice Cream", rating: "5", description: "Really great texture. The ice cream is Persian ice cream, so it is gooey. The flavors are wonderful, especially considering they are floral flavors. Definitely recommend."},
  {x: 34.076059, y: -118.323389, name: "Salt & Straw", rating: "3", description: "Had very interesting flavors. Came when they had their fermentation series. Would recommend for those seeking exciting flavors, but quality wise, it was only average."},
  {x: 33.706398, y: -117.786998, name: "Scoops N Scoops", rating: "4", description: "Good, creamy nitrogen ice cream. Definitely on the pricier side but very worth."},
  {x: 34.076360, y: -118.354860, name: "Sweet Rose Creamery", rating: "4", description: "Sweet Rose has lots of very interesting flavors, such as basil ice cream. Their ice cream is extremely rich and creamy, but they are definitely on the pricier side."},
  {x: 34.000582, y: -118.482193, name: "Three Twins Ice Cream", rating: "4", description: "Plain flavors, but really good. They are also vegan."}
  ];

$(document).ready(function() {

function initMap() {

  // Setting up the map
  var mapProp = {
    center: {lat: locations[0].x, lng: locations[0].y},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
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

// Loading the map
google.maps.event.addDomListener(window, 'load', initMap);

});

// Function that allows panning when marker or dropdown menu item is selected
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
