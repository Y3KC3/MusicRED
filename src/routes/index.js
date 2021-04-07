const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const event = require('../controllers/event');

module.exports = app => {
    router.get('/', home.index);
    router.get('/about', home.about);
    router.get('/image/:image_id', image.index);
    router.post('/image', image.create);
    router.post('/image/:image_id/like', event.like);
    router.post('/image/:image_id/comment', event.comment);
    router.delete('/image/:image_id', image.remove);

    app.use(router);
};