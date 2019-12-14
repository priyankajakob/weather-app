const request = require('request')

const forecastReq = (long,lang,callback)=>{
    const url = `https://api.darksky.net/forecast/058170a18732f24bf65d5ffed42afcba/${long},${lang}`
    request({url,json:true},(error,{body})=>{
        if(error){
            callback({error:'unable to connect to dark sky api'},undefined)
        }
        else if(body.error){
            callback({error:'unable to fetch temp & precip'},undefined)
        }
        else {
            const {icon:forecast}=body.currently
            const data = {
               forecast
            }
            callback(undefined,data)
            
        }  
    })
}

module.exports = {
    forecastReq
}
