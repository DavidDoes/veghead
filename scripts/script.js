'use strict';

//Places - Nearby Search
// const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'; 
//Places - Find by Text
const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'; 
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

function geoCoder(loc, callback){
    console.log('geoCoder called');

    const params = {
        key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
        address: `${loc}`, //plugged in from listenSubmit
    }
    $.getJSON(GEOCODE_URL, params, callback)
}

function showResults(){
    //generate HTML display Places and Details
}

//not implemented
function getDetails(placeId, callback){
    console.log('getDetails called');

    const details = {
        key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
        placeid: `${placeId}`
    }
    // $.getJSON(DETAILS_SEARCH_URL, params, callback)
}

function getPlaces(location, callback){
    console.log('getPlaces called');    
    //Find by Text
    // const params = {
    //     key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
    //     input: 'vegan',
    //     inputtype: 'textquery'
}

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        // const locationGetter = navigator.geolocation.getCurrentPosition((pos)=> getPlaces(pos));
        const locationGetter = $(event.currentTarget).find('.js-userLocale');
        const location = locationGetter.val();
        geoCoder(location, getDetails); //push data to getPlaces, run getDetails
    })
}

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