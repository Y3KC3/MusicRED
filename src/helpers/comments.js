const { Comment, Image } = require('../models');

module.exports = {
    async newets(){
        const comments = await Comment.find().limit(5).sort({ timeStamp: -1 });
        for(const comment of comments){
            const image = await Image.findOne({ _id: comment.image_id });
            comment.image = image;
        };
        return comments;
    },
};