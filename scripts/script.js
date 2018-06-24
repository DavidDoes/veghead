// 'use strict';

//TO-DO LIST
// - Not all results that normally come up in Google Maps search are showing
// - Stylize map
// - Finish Resources
// - Make nav bar turn to hamburger menu on scroll
// - Button to return user to top
// - Fix white space to right on mobile
// - Names of results should be links to that item's details or directions.
// - Input accepts any form of address; change wording to reflect such.


//Global variables
let geocoder;
let map;
let service;
let markers = Array();
const infowindow = new google.maps.InfoWindow();

$(handleApp);

function handleApp() {
  initMap();
  listenSubmit();
}

//get nearby restaurants 
function getPlaces(loc){
    console.log('getPlaces called');
    let address = `${loc}`
    console.log(address);
    //geocode user postal
    geocoder.geocode({'address':address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){ //if everything checks out
            let addrLocation = results[0].geometry.location;
            map.setCenter(addrLocation);
            //store coords in hidden elements:
            document.getElementById('lat').value = results[0].geometry.location.lat();
            document.getElementById('lng').value = results[0].geometry.location.lng();

            //add marker at user location
            // var addrMarker = new google.maps.Marker({
            //     position: addrLocation, //from above
            //     map: map,
            //     title: results[0].formatted_address, //from Google API object
            //     icon: 'images/favicon.png'
            // });
            let type = "restaurant";
            let radius = "32000";
            let lat = document.getElementById('lat').value;
            let lng = document.getElementById('lng').value;
            let cur_location = new google.maps.LatLng(lat, lng);
            //request to Places
            let request = {
                //placeId = place_id
                location: cur_location,
                radius: radius,
                type: ['restaurant'],
                keyword: 'vegan'
            };
            service = new google.maps.places.PlacesService(map); 
            service.nearbySearch(request, displaySearchResults); 
        } else {
            alert('No results found. Please try another location.')
        }
    });
};

function displaySearchResults(results, status) {
    // console.log(results);
    // console.log(status);
    // service.getDetails(results, displaySearchResults); //use getDetails service
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
            console.log(results[i]); 
        }
    }
}

function createMarkers(results, status){
    console.log('createMarkers called');
    //iterate thru Places array to display Places and Details
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]); 
        }
    }
}

function createMarker(obj){
    let contentString = `<strong>${obj.name}</strong> | <a href="https://www.google.com/maps/dir/?api=1&destination=${obj.name}&destination_place_id=${obj.place_id}" target="_blank">${obj.vicinity}</a>`;
    const image = 'images/favicon.png';
    let marker = new google.maps.Marker({
        position: obj.geometry.location,
        map: map,
        title: obj.name,
        icon: image
    });
    markers.push(marker); //send to marks global var, which is an array
    //display info at marker:
    marker.addListener('click', function(){
        infowindow.setContent(contentString)
        infowindow.open(map, marker);

    })
    map.addListener('click', function(){
        infowindow.close(); //closes infowindow if empty map space clicked
    })
    // infos.push(infowindow); //send to infos global var, which is an array
}

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        const locationGetter = $(event.currentTarget).find('#js-userLocation');
        const location = locationGetter.val();
        getPlaces(location); //push location to geoCoder, run getPlaces after
        $('#map').show(); //unhide map ID
        $('html, body').animate({ //fluid scroll to map
            scrollTop: $("#map").offset().top
        }, 1000);
    })
}

function initMap(){
    geocoder = new google.maps.Geocoder();
    
    var myOptions = { //custom map styling
        zoom: 10,
    };
    //generate new map at 'map' id in HTML
    map = new google.maps.Map(document.getElementById('map'), myOptions);
    google.maps.event.addListenerOnce(map, 'idle', () => {
        document.getElementsByTagName('iframe')[0].title = "Google Maps";
    }) //set aria title to "Google Maps"
}