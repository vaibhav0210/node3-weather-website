const request = require('request');

const forecast = (longitude, latitude, callback)=>{
    let options = {
        url:'https://api.darksky.net/forecast/2e497a4788dbf94715f2fa662c0f100e/'+ latitude + ','  + longitude ,
        json:true
    }

    request(options, (error, response)=>{
        if(error){
            callback('Error has occured', undefined);
        }
        else if(response.body.error){
            callback(response.body.error, undefined);
        }
        else{
            callback(undefined, {
                summary: response.body.daily.summary
            });
        }
    });
};

module.exports = forecast;