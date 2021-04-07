const mongoose = require('mongoose');
const { database } = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true
}).then(res => console.log('Successful Conection To The Datebase'))
  .catch(err => console.log(err));