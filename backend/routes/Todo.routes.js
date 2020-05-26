const express = require('express')
const router = express.Router();

const Todo = require('../models/Todo')

router.post('/addTodo',(req,res) => {
    const { title ,description,username} = req.body;
    const toDo = new Todo({title,description,username});
    toDo.save().then( todo => {
        res.status(200).json({'message':'todo created successfully',todo})
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})
router.post('/deleteTodo',(req,res) => {
    const { _id } = req.body;
    Todo.deleteOne({_id}).then( todo => {
        res.status(200).json({'message':'todo deleted successfully',todo})
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})
router.get('/getTodos',(req,res) => {
    Todo.find().then( todos => {
        res.status(200).json({'message':'todo created successfully',todos})
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})

module.exports = router;