const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public')); We need to call after middleware so that it will render the help.htm page

app.use((req, res, next)=>{ //middleware
    var now = new Date().toString(); //logger
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintanace.hbs');
// });

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        WelcomeMessage:'Welcome to Website.',
        // currentYear:new Date().getFullYear()
    })
});

app.get('/about', (req,res)=>{
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle:'About Page',
        // currentYear:new Date().getFullYear()
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});