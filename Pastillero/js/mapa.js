// /*
//  * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
//  * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
//  */
$( document ).on( "pageinit", "#sucursales", function() {
    var obvelisco;
    obvelisco = {
        lat: -34.603713, lng: -58.381640
    };
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            obvelisco.lat=position.latitude;
            obvelisco.lng=position.longitude;
        });
    }
    var map;
    var infowindow;
    function initMap() {


        map = new google.maps.Map(document.getElementById('mapa'), {
            center: obvelisco,
            zoom: 15
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: obvelisco,
            radius:800,
            // type: ['convenience_store']
            keyword:'farmacia'
        }, callback);
    }
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
    initMap();
});
