const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoName: {
        type: String,
        requred: "You must include a task item"
       
    }

})

const todo = mongoose.model("todo", todoSchema);

module.exports = todo;
