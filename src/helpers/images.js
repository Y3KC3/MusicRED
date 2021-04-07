const { Image } = require('../models');

module.exports = {
    async popular(){
        const images = await Image.find().limit(6).sort({ like: -1 }); //que solo me devuelva 5 imagenes
        return images;
    },
};