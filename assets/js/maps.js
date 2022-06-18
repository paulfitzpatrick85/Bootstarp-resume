
// var APIKey = "AIzaSyDMJlZjn2Dn-iT3q55wa8uzkZctZdpIYUM";
 // style.css code added to help map display correctly
        
function initMap() {
     var map = new google.maps.Map(document.getElementById("map"), {  // object created by api
        zoom:3,                               //zoom of map
         center: {                     //co-ordinates where map initially displays
             lat: 46.619261,
            lng: -33.134766
         }
    });

var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //each letter will on marker

var locations = [      //array of obects
    {lat: 40.785091, lng: -73.968285},
    {lat: 41.084045, lng: -73.874245},
    {lat: 40.754932, lng: -73.984016}
    ];

 //iterate through locations
 //.map is a js built in method,not google function and is similar to forEach but returns an array. can take 3 args
var markers = locations.map(function(location, i) {  //location is current value of array as its looped through, i is index number of where we current are in array
    return new google.maps.Marker({          //return marker object
        position: location,                  //set to current location (presumable in array?)
        label: labels[i % labels.length]      // get letter from labels variable, % loops round if there are more than 26 locations(corrosponding to 26 letters) rather than throw error
     });
 });

 // Add a marker clusterer to manage the markers.
var markerClusterer = new MarkerClusterer(map, markers, {imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",});
       }
    