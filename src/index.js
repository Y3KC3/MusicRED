const express = require('express');
const config = require('./server/config');

//database
require('./database');

//starting the server
const app = config(express());

//listening to the server
app.listen(app.get('port'), (req,res) => {
    console.log('Server on port ', app.get('port'));
});