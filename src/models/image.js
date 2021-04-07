const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const DataImage = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    fielName: { type: String },
    uniqueId: { type: String },
    views: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    timeStamp: { type: Date, default: Date.now }
});

/*DataImage.virtual('uniqueId')
    .get(function (){
        return this.fielName.replace(path.extname(this.fielName), ''); //le decimos que quite las extenciones osea que no se vea el .png etc
});*/ //Una Forma Mas Trabajosa

module.exports = mongoose.model('Image', DataImage);