const request = require("request")
const fs = require('fs')
const fetch = require('node-fetch')


const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=4079383dad152206f66a3e12e5a692f2&query="+longitude+","+latitude
    request({url, json:true}, (error, response)=> {
        if (error){
            callback("Unable to connect to weather services", undefined)
        } else if(response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                response :response.body.current.weather_descriptions[0]+". It is currently " +response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+" degrees.",
                imageURL: response.body.current.weather_icons[0]
            }
            )
        }
    })

}

module.exports = forecast