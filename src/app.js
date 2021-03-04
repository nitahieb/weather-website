const path = require("path")
const hbs = require("hbs")
const express = require("express")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const viewsPath = path.join(__dirname,"./templates/views")
const partialsPath = path.join(__dirname, "./templates/partials")
const port = process.env.PORT || 3000

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,"../public")))

app.get("",(req,res)=> {
    res.render('index', {
        title: "Weather App",
        name: "Doobie"
    })
})

app.get("/about", (req,res) =>{
    res.render("about", {
        title: "About Me",
        name: "Doobie"
    })
})

app.get("/help", (req,res) =>{
    res.render("help",{
        helpMessage: "this is some helpful text!",
        title: "Help",
        name: "Doobie"
    })
})


app.get("/weather",(req,res)=>{
    if (!req.query.address){ 
        return res.send({
            error: "You must provide an address"
            })
        }
    geocode(req.query.address, (error,{latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude,latitude,(error,weatherData)=> {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: weatherData,
                location: location,
                address: req.query.address
            })

        })
})
})

app.get("/products",(req,res)=> {
    if (!req.query.search){ 
    return res.send({
        error: "You must provide search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req,res)=> {
    res.render("notFound",{
        helpMessage: "Help Page not found",
        title: "Help Page not found",
        name: "Doobie"
    })
})

app.get("*",(req,res)=>{
    res.render("notFound",{
        helpMessage: "Page not found",
        title: "404 PAGE NOT FOUND",
        name: "Doobie"
    })
})

app.listen(port,()=> {
    console.log("server is up on port "+port)
})