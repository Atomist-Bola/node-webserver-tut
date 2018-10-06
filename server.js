console.log('Starting server.js');

var fs = require('fs');
var express = require('express');
var hbs = require('hbs');

const port = process.env.PORT || 3000;
hbs.registerPartials('/Users/bincom/Desktop/project/Bolanle/node/nodeServers/views/partials'); 
hbs.registerHelper('getYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('getMonth', ()=>{
    return new Date().getMonth();
})
var app = express();

// Express Middlewares
app.use(express.static(__dirname + '/public') );

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err){
            console.log('There was a problem here');
            
        }
    });
    console.log(log); 
    next();
});



app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('home.hbs', {
        name: 'Bolanle',
        activity: 'Practicing', 
        likes: ['eating',
         'coding', 
          'sleeping',
           'gaming',
        {
            word: 'Work',
        }]
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        title: 'About Page'
       
    });
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})