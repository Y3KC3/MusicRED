const { Image, Comment } = require('../models');

async function imagesCounter() {
    return await Image.countDocuments(); //cuantos datos estan almacenados
};

async function commentsCounter() {
    return await Comment.countDocuments();
};

async function imageTotalViewsCounter() {
    const results = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: { $sum: '$views' }
        }
    }]);
    return results[0].viewsTotal;
};

async function imageTotalLikesCounter() {
    const results = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: { $sum: '$like' }
        }
    }]);
    return results[0].likesTotal;
};

module.exports = async () => {
    const results = await Promise.all([
        imagesCounter(),
        commentsCounter(),
        imageTotalViewsCounter(),
        imageTotalLikesCounter()
    ]); //ejecuta todas las funciones al paralelo
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    };
};