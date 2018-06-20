// 'use strict';

//Global API variables
var geocoder;
var map;
var service;
var markers = Array();
var infos = Array();

//get nearby restaurants 
function getPlaces(loc){
    console.log('getPlaces called');
    var address = `${loc}`
    console.log(address);
    //geocode user postal
    geocoder.geocode({'address':address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){ //if everything checks out
            var addrLocation = results[0].geometry.location;
            // map.setCenter(addrLocation);
            //store coords in hidden variables:
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            //add new marker
            var addrMarker = new google.maps.Marker({
                position: addrLocation, //from above
                map: map,
                title: results[0].formatted_address, //from Google API object
                icon: 'favicon.png'
            });
            var type = "restaurant";
            var radius = "1000";
            var lat = document.getElementById('lat').value;
            var lng = document.getElementById('lng').value;
            var cur_location = new google.maps.LatLng(lat, lng);
            //request to Places
            var request = {
                location: cur_location,
                radius: radius,
                types: [type],
                keyword: 'vegan'
            };
            service = new google.maps.places.PlacesService(map); 
            service.nearbySearch(request, createMarkers); //use nearbySearch service
            service.getDetails(request, createMarkers); //user getDetails service
        } else {
            alert('Please enter a valid postal code.')
        }
    });
};

function createMarkers(results, status){
    console.log('createMarkers called');
    //generate HTML display Places and Details
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]); //built-in API function
        }
    }
}

function createMarker(obj){
    var image = 'favicon.png';
    var mark = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name,
        icon: image
    });
    markers.push(mark); //send to marks global var, which is an array
    //display info at marker:
    var infowindow = new google.maps.Infowindow({
        content: 
        'obj.name + obj.vicinity'
    });
    infos.push(infowindow); //send to infos global var, which is an array
}

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        // const locationGetter = navigator.geolocation.getCurrentPosition((pos)=> getPlaces(pos));
        const locationGetter = $(event.currentTarget).find('#js-userPostal');
        const location = locationGetter.val();
        getPlaces(location); //push location to geoCoder, run getPlaces after
    })
}

function initMap(){
    geocoder = new google.maps.Geocoder();
    var myOptions = { //custom map styling
        zoom: 10
    };
    //generate new map at 'gmap_results' id in HTML
    var map = new google.maps.Map(document.getElementById('gmap_results'), myOptions);
}

google.maps.event.addDomListener(window, 'load', initMap);
$(listenSubmit);



// function getPlaces(userLocale, callback){
//     console.log('getPlaces called')
//     const params = {
//         keyword: 'vegan',
//         // location: `${userLocale}`,
//         address: `${userLocale}`,
//         type: 'restaurant',
//         rankby: 'distance',
//         key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
//     }
//     $.getJSON(PLACES_SEARCH_URL, params, callback) 
// };

// function geocodePostal(userLocale){
//     console.log(geocodePostal called);
//     //convert postal to latlng using geocoder
//     const location = `${}`
// }
 
// navigator.geolocation.getCurrentPosition((pos)=>console.log(pos))
// getting location with inputting postal code: (not implemented)
// function listenSubmit(){
//     $('.js-searchForm').submit(event => {
//         event.preventDefault();
//         console.log('submit button clicked');
//         const userLocaleTarget = $(event.currentTarget).find('.js-userLocale');
//         const userLocale = userLocaleTarget.val();
//         userLocaleTarget.val("");
//         geocodePostal(userLocale);
//         getPlaces(userLocale, getData);        
//     });
// };
