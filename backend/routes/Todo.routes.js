const express = require('express')
const router = express.Router();

const Todo = require('../models/Todo')

router.post('/addTodo',(req,res) => {
    const toDo = new Todo(req.body);
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
router.get('/getTodos/:username',(req,res) => {
    const {username} = req.params;
    Todo.find({username}).then( todos => {
        res.status(200).json({'message':'todo created successfully',todos})
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})

router.post('/updateTodo',(req,res) => {
    const {_id} = req.body 
    Todo.findByIdAndUpdate({_id},req.body).then( updatedTodo => {
        res.status(200).json({'message':'Todo updated suceesfully',updatedTodo})
    }).catch( err => {
        res.status(422).json(`error:${err.message}`);
    })
})

router.post('/updatePriority',(req,res) => {
    const {_id,priority} = req.body;
    Todo.findByIdAndUpdate({_id},{priority}).then( updatedTodo => {
        res.status(200).json({'message':'Todo updated suceesfully',updatedTodo})
    }).catch( err => {
        res.status(422).json(`error:${err.message}`);
    })
})

module.exports = router;