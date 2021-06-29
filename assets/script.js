var myLatLng = { lat: 38.8893, lng: -77.1641 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

var directionService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calcRoute() {
    var request = {
        origin: document.getElementById("beginPoint").value,
        destination: document.getElementById("endPoint").value,
        travelMode: google.maps.TravelMode.DRIVING, //can be update to WALKING, BICYCLING or TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    directionService.route(request, (result, status) => {
        if(status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "<div>From: " + document.getElementById("beginPoint").value + ". <br />To: " + document.getElementById("endPoint").value + ".<br/>Driving distance: " + result.routes[0].legs[0].distance.text + ". <br />Duration: " + result.routes[0].legs[0].duration.text + "</div>";

            directionsDisplay.setDirections(result);
        } else {
            directionsDisplay.setDirections({ routes: []});

            map.setCenter(myLatLng);
            output.innerHTML = "<div>Could not retrieve driving distance.</div>";
        }
    });
}

var options = {
    types: ['(cities)']
}

var beginInput = document.getElementById("beginPoint");
var autocompleteBegin = new google.maps.places.Autocomplete(beginInput, options);

var endInput = document.getElementById("endPoint");
var autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);
