const path = require('path');
const express = require('express');
const request = require('request');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, 'public');
console.log(publicDirectoryPath);

const viewsPath = path.join(__dirname, './templates/views');
console.log(viewsPath);

const partialPath = path.join(__dirname, './templates/partials');
console.log(partialPath);

//setup handler bars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Vaibhav Bansal'
    });
});

app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'About Page',
        name: 'Vaibhav Bansal',
        message: 'This is a help messagfe'
    });
});

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/weather', (req,res)=>{

    //since the parameters are the part of the requrest query
    if(!req.query.address){
        res.send({
            error: "You must provide the address"
        });
        return;
    }

    geocode(req.query.address, (error, data) => {

        if (error) {
            res.send({
                error: "Unable to get the data"
            });
            return;
        }
    
        forecast(data.longitude, data.latitude, (error, forecastData) => {
    
            if (error) {
                res.send({
                    error: "Unable to send Forecats Data"
                });
                return;
            }
    
            res.send({
                location: data.location,
                summary: forecastData.summary
            });
            return;
        });
    });
});

app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    console.log(req.query);

    res.send({
        products: []
    });
});

//for URL specific 404 pages
app.get('/help/*', (req,res)=>{
    //res.send('Article Not Found');
    res.render('404', {
        title: '404 Page- For any page inside help',
        name: 'Vaibhav Bansal',
        message: 'Help Article Not Found'
    });
});

//for 404 pages handling- any 404 pages
app.get('*', (req,res)=>{
    //res.send("My 404 page");
    res.render('404', {
        title: '404 Page- For any generic page',
        name: 'Vaibhav Bansal',
        message: 'Page Not Found'
    });
});


//start the server
app.listen(3001, ()=>{
    console.log('Server is uP on port 3000!');
});

