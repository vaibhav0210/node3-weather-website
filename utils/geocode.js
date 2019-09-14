const request = require('request');

const geocode = (address, callback) => {
    let options = {
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+  encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmliaG9yMTIzIiwiYSI6ImNqenA4N2VseDA5azIzY21zbTZ3cDBuNW8ifQ.3WCLvzNeqPp2HM_MiBMhpg&limit=1',
        json: true
    }

    request(options, (error, response)=>{
        if(error){
            callback('Unable to connect to Location Services');
        }
        else if(response.body.message){
            callback('Unable to find Location, try another search', undefined);
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].text
            });
        }
    });
};

module.exports = geocode;