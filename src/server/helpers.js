const moment = require('moment');

const helpers = {};

helpers.timeago = timeStamp => {
    return moment(timeStamp).startOf('minute').fromNow(); //le damos la fecha lo convertimos en minutos y lo publicamos
};

module.exports = helpers;