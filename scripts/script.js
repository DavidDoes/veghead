'use strict';
//origin error fix:
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     next();
//   });

//Places - Nearby Search
// const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'; 
//Places - Find by Text
// const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?';
const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=vegan&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&&key=AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0'; 
//need to pinpoint user's location in this URL somehow
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

function geoCoder(loc, callback){
    console.log('geoCoder called');
    const settings = {
        url: GEOCODE_URL,
        data: {
                key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
                address: `${loc}`, //plugged in from listenSubmit    
            },
            dataType: 'json',
            crossDomain: true,
            type: 'GET',
            success: callback
        };
        $.ajax(settings);
    }

//     const params = {
//         key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
//         address: `$(loc)`, //plugged in from listenSubmit
//     }
//     $.getJSON(GEOCODE_URL, params, callback)
//     HOW DO I GET LATLNG TO getPlaces()??
// }

function getPlaces(loc, callback){
    console.log('getPlaces called');
    // store data from API object
    const settings = {
        url: PLACES_SEARCH_URL,
        data: {

        }
    }
    $.getJSON(PLACES_SEARCH_URL, params).then(callback)
    .catch(err => console.log(err));
    getDetails(loc);
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

function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        // const locationGetter = navigator.geolocation.getCurrentPosition((pos)=> getPlaces(pos));
        const locationGetter = $(event.currentTarget).find('.js-userLocale');
        const location = locationGetter.val();
        geoCoder(location, getPlaces); //push location to geoCoder, run getPlaces after
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
