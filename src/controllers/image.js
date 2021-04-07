const path = require('path');
const fs = require('fs-extra');
const { randomName } = require('../helpers/libs'); //solo quiero su biblioteca randomName

const { Image, Comment } = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req,res) => {
    //console.log(req.params.image_id); //aqui resivimos el parametro llamado image_id que esta en el index de las rutas
    let viewModel = { image: {}, comments: {}};
    const image = await Image.findOne({ fielName: {$regex: req.params.image_id}}).lean(); //busca un solo documento segun el fielName //el $regex no cuenta las extensiones si no las coincidencia, si una parte del dato coinciden pues te trae el dato //esto esta relacionado a las expresiones en JavaScript
    if (image) {
        viewModel.image = image;
        viewModel = await sidebar(viewModel);
        const comments = await Comment.find({ image_id: image._id }).sort({ timeStamp: -1 }).lean();
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        await Image.findByIdAndUpdate(image, {
            $inc: { views: 0.5 }
        }, function (err) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.render('image', viewModel);
            };
        });
    } else {
        res.redirect('/');
    };
};

ctrl.create = (req,res) => {
    const saveImage = async () => {
        const URLImage = randomName();
        const images = await Image.find({ fielName: URLImage }) //busca en todas las imagenes
        if (images.length > 0){ //Si has encontrado un archivo con el mismo nombre
            saveImage(); //no va a seguir con el codigo si no que se va a repetir
        } else {
            const directionImageTemp = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase(); //path.extname para extraer la extencion de un nombre osea que no me va a dar el nombre del objeto si no el String que esta en el objeto contando con el .jpg o .png etc.
            const targetPath = path.resolve(`src/public/upload/${URLImage}${ext}`);
            if (ext === '.jpg' || ext === '.png' || ext === 'jpeg' || ext === 'gif' || ext === '.tiff' || ext === '.psd' || ext === '.bmp' || ext === '.mp4' || ext === '.avi' || ext === '.mkv' || ext === '.flv' || ext === '.mov' || ext === 'wmv' || ext === '.divx') {
                await fs.rename(directionImageTemp, targetPath); //mueve un archivo de un directorio a otro //primero le digo donde se encuentra el archivo y luego donde lo voy a mover
                const newImage = new Image({
                    title: req.body.title,
                    fielName: URLImage + ext,
                    uniqueId: URLImage,
                    description: req.body.description
                });
                const imageSaved = await newImage.save();
                res.redirect('/image/' + URLImage);
            } else {
                await fs.unlink(directionImageTemp); //Para eliminar la imagen con una direccion
                res.status(500).json({ error: 'El Formato Del Archivo No Esta Permitido' });
            };
        };
    };
    saveImage();
};

ctrl.remove = async (req,res) => {
    const image = await Image.findOne({ fielName: {$regex: req.params.image_id}}).lean();
    if (image){
        await fs.unlink(path.resolve('src/public/upload/' + image.fielName));
        await Comment.deleteOne({image_id: image._id});
        await Image.findOneAndRemove(image, function(err){
            if(!err){
                console.log(err);
            } else {
                res.redirect('/');
            };
        });
        res.json(true);
    };
};

module.exports = ctrl;