const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    duedate:{
        type: Date,
        default: new Date()
    },
    priority:{
        type: String,
        default: "Medium"
    },
    status:{
        type: String,
        default: "New"
    },
    createdDate:{
        type: Date,
        default: new Date()
    }
})
module.exports = mongoose.model("todo", TodoSchema);