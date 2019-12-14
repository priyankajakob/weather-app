const path = require('path')
const hbs=require('hbs')
const express = require('express')
const app = express()
const {geoCodeReq} = require('./public/src/utils/Geocode')
const {forecastReq} = require('./public/src/utils/Forecast')

//const publicDirectoryPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')

app.use(express.static('public'))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

const port = 3010

app.get('',(req,res)=>{
    res.render('index',{
        name:'Priyanka',
        author:'Preethy',
        footer:'this is footer',
        title:'Welcome'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Priyanka',
        author:'Preethy',
        footer:'this is footer',
        title:'About'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text for you',
        footer:'this is footer',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address term'
        })
    }
    geoCodeReq(req.query.address,(error,{long,lang,location}={})=>{
        if(error){
            return res.send(error)}

        forecastReq(long,lang,(error,{forecast})=>{
                if(error){
                    return res.send(error)
                }
                    res.send({
                        location,
                        forecast,
                        address:req.query.address
                    })
                })
        })
})

app.get('/help/*',(req,res)=>{
    res.render('404error',{
        error:'help artile not found',
        title:'404'
    })
})

app.get('/*',(req,res)=>{
    res.render('404error',{
        error:'Sorry, the page you are looking for doesn\'t exists',
        title:'404'
    })
})

app.listen(port,()=>{
    console.log("listening on port ",port)
})