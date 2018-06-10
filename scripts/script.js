'use strict';

const PLACES_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const DETAILS_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/details/json?';

function buildPlaces(postal, callback){
    console.log('buildPlaces called')
    const params = {
        key: 'AIzaSyCT4F67piVv6cvASPssAR1s_buPw6kBQw0',
        keyword: 'vegan',
        location: `${postal}`,
        type: 'restaurant',
        rankby: 'distance'
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
        const postalTarget = $(event.currentTarget).find('.js-postal');
        const postal = postalTarget.val();
        postalTarget.val("");
        buildPlaces(postal, getData);        
    });

};

$(listenSubmit);