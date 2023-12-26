const mongoose = require('mongoose');

const comment = mongoose.model('comment', {
    auteur : {
        type : String
    },
    hour : {
        type : String
    },
    date : {
        type : Date
    },
    commentaire : {
        type : String
    }


})

module.exports = comment;