'use strict';
//KNOWN ISSUES
// - Callback in GeoCoder?
// - How do we get Geocoded info to next function? 
// - How do we avoid callback hell?`
// - How do we access API object? 

//Places - Nearby Search
// const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?input=vegan&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&key=AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0'; 
//Places - Find by Text
const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=vegan&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&key=AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0'; 
//need to pinpoint user's location in this URL somehow
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';
// const GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

const GEOCODE_URL = `https://maps.googleapis.com/maps/api/geocode/json?postal_code=`;
const key = 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0';

function geoCoder(loc, getPlaces){
    //take user's inputted postal at `${loc}` and convert to ltlng
    console.log('geoCoder called');
    // let URL = `${GEOCODE_URL}${loc}&${key}`;
    const settings = {
        datatype: 'jsonp'
    }
    $.ajax(URL, settings, getPlaces);
}
    // below doesn't feel right - this might be best used in getPlaces func?
    // const settings = {
    //     url: GEOCODE_URL,
    //     data: {
    //             key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
    //             address: `${loc}`, //plugged in from listenSubmit    
    //         },
    //         dataType: 'json',
    //         crossDomain: true,
    //         type: 'GET',
    //         success: callback
    //     };
    //     $.ajax(settings);
    //     console.log('Directly from user input: ' + `${loc}`);
    //     console.log('From settings.data.address: ' + settings.data.address);
    //above two should be the same
    // }


function getPlaces(data, callback){
    console.log('getPlaces called');
    // store data from API object
    // const userLocation = 
    // const settings = {
    //     url: PLACES_SEARCH_URL,
    //     data: {

    //     }
    // }
    // $.getJSON(PLACES_SEARCH_URL, params).then(callback)
    // .catch(err => console.log(err));
    // getDetails(loc);
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
