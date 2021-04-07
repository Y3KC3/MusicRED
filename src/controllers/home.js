const ctrl = {};
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

ctrl.index = async (req,res) => {
    let images = await Image.find().sort({ timeStamp: -1 }).lean(); // 1 acendente -1 desendente
    let viewModel = { images: [] };
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    console.log(viewModel.sidebar.comments[0].image); //Con esto estamos viendo la imagen que nos devuelve el comentario
    res.render('index', viewModel); 
};

ctrl.about = (req,res) => {
    res.send("ABOUT");
};

module.exports = ctrl;