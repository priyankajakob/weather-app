const request = require('request')

const geoCodeReq = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5kcmV3cDEyMyIsImEiOiJjazN5MmpkbW4wMWszM2xuOHZzeHh5NzJ2In0.bMZKwRO8Lznapmo4X2e6ag`
    //console.log(url)
    request({url, json: true},(error,{body})=>{
        if(error){
            callback({error:"unable to connect to mapbox api"},undefined)
        }
        else if(body.message){
            callback({error:"Unable to find long & lat"},undefined)
        }
        else if(body.features.length==0){
            callback({error:"Unable to find long & lat"},undefined)
        }
        else {
            const lang = body.features[0].geometry.coordinates[0]
            const long = body.features[0].geometry.coordinates[1]
            const location = body.features[0].place_name
            const data = {
                lang,
                long,
                location
            }
            callback(undefined,data)
        }
        })
}

module.exports={
    geoCodeReq
}