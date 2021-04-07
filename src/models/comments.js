const { Schema, model } = require('mongoose'); //asi tambien funciona
const { ObjectId } = Schema;

const newComment = new Schema({
    image_id: { type: ObjectId },
    //userName: { type: String, required: true},
    comment: { type: String, require: true },
    timeStamp: { type: Date, default: Date.now }
});

newComment.virtual('image')
    .set(function (image){
        this._image = image;
    }).get(function (){
        return this._image;
    }); 
    /*aqui resivimos la funcion que nos devuelve el helpers (comments) llamada (image) que 
    es lo que nos retorna el (comment) resivimos la image y lo convertimos en una variable
    en la base de datos virtual llamada _image luego de eso lo que hacemos con la informacion
    es retornar el this._image esto no se ve en mongo pero se puede buscar con 
    console.log(viewModel.sidebar.comments[0].image); esto es algo virtual esta fuera de la base
    de datos*/
    
module.exports = model('Comment', newComment);