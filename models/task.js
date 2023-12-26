const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
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

const taskSchema = new mongoose.Schema({
    titre :{
        type :  String
    },
    description : {
        type:String
    },
    dateFin: {
        type: Date
    }, 
    Proprietaire : {
        type : String
    },
    Priorite: {
        type:Number
    },
    Etat : {
        type : String
    },
    categorie : {
        type : String
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    documents: {
        type : String
    },
    comments : [commentSchema]


    
})
const task = mongoose.model('task', taskSchema);
module.exports = task;