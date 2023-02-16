const express=require('express');
const app= express();
const port =8000;
const expresslayout = require('express-ejs-layouts');

// using for layouts
app.use(expresslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});