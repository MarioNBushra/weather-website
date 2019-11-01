const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) +  '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibWFyaW9idXNocmEiLCJhIjoiY2syM2R3b3ozMDM2MDNpcDkxemltaGM0NiJ9.7x9JIh8NQOv37oSG5PPbxg'
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find a location, Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode