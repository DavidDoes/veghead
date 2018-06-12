'use strict';

const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address';

function buildPlaces(userLocale, callback){
    console.log('buildPlaces called')
    const params = {
        keyword: 'vegan',
        // location: `${userLocale}`,
        address: `${userLocale}`,
        type: 'restaurant',
        rankby: 'distance',
        key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
    }
    $.getJSON(PLACES_SEARCH_URL, params, callback) 
};

function buildDetails() {
    console.log('buildDetails called')
    const params = {
        key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
        placeid: `${placeID}`
    }
    $.getJSON(DETAILS_SEARCH_URL, params, callback)
}

function getData(data){
    console.log(data);
    const results = data.items.map((item) => generateResults(item));
}

// var lat = '';
// var lng = '';
// var address = `${userLocale}`;
// geocoder.geocode( { 'address': address}, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//      lat = results[0].geometry.location.lat();
//      lng = results[0].geometry.location.lng();
//     });
//   } else {
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });

function geocodePostal(userLocale){
    
}
 
// navigator.geolocation.getCurrentPosition((pos)=>console.log(pos))
function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        const userLocaleTarget = $(event.currentTarget).find('.js-userLocale');
        const userLocale = userLocaleTarget.val();
        userLocaleTarget.val("");
        geocodePostal(userLocale);
        buildPlaces(userLocale, getData);        
    });
};

$(listenSubmit);