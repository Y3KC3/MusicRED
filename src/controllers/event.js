const {  Image, Comment } = require('../models'); 

const ctrl = {};

ctrl.comment = async (req,res) => {
    const image = await Image.findOne({ fielName: {$regex: req.params.image_id }}).lean();
    if (image){
        const newComment = new Comment(req.body);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/image/' + image.uniqueId);
    };
};

ctrl.like = async (req,res) => {
    const image = await Image.findOne({uniqueId: {$regex: req.params.image_id}}).lean();
    if (image){
        await Image.findByIdAndUpdate(image, {
            $inc: { like: 0.5 }
        }, function(e){
            if (e){
                console.log(e);
                res.redirect('/');
            } else {
                res.json({ likes: image.like });
            };
        });
    };
};

module.exports = ctrl;