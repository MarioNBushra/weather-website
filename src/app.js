const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath   = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

//Setup static directory to serv
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs') // Setup hbs engine
app.set('views', viewsPath) // Setup views location
hbs.registerPartials(partialPath)

//get home page to render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mario Bushra'
    })
})
//get about page to render
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Mario Bushra'

    })
})
//get help page to render
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mario Bushra',
        helpText: 'This is some helpful text'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provaide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return(res.send({error}))
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Egypt',
    //     address: req.query.address
    // })
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000, Here we go')
})