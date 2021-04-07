const helpers = {};

helpers.randomName = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let stringRandom = "";
    for (let i = 0; i < 5; i++){
        stringRandom += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return stringRandom;
};

module.exports = helpers;