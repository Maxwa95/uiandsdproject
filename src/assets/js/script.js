//map
window.initMap = function() {
    var location = {lat: 31.192700, lng: 29.906168};
    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 15,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}