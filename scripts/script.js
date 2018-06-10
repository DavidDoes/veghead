'use strict';

const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';

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
        key: 'a11a69edeac01748b3eec35cf46febba',
        placeid: `${placeID}`
    }
    $.getJSON(DETAILS_SEARCH_URL, params, callback)
}

function getData(data){
    console.log(data);
    const results = data.items.map((item) => generateResults(item));
}
 
// navigator.geolocation.getCurrentPosition((pos)=>console.log(pos))
function listenSubmit(){
    $('.js-searchForm').submit(event => {
        event.preventDefault();
        console.log('submit button clicked');
        const userLocaleTarget = $(event.currentTarget).find('.js-userLocale');
        const userLocale = userLocaleTarget.val();
        userLocaleTarget.val("");
        buildPlaces(userLocale, getData);        
    });
};

$(listenSubmit);