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

router.post('/addBulkTodos',(req,res) => {
    Todo.insertMany(req.body).then( todos => {
        res.status(200).json({'message':'todo deleted successfully',todos})
    }).catch(err => {
        console.log(err)
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
    Todo.find({username,completed:false}).then( todos => {
        res.status(200).json({'message':'todo created successfully',todos})
    }).catch(err => {
        res.status(422).json(`error:${err.message}`);
    })
})

router.get('/getArchivedTodos/:username',(req,res) => {
    const {username} = req.params;
    Todo.find({username,completed:true}).then( todos => {
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

router.post('/updateCompleted',(req,res) => {
    const {_id,completed} = req.body;
    let status = 1
    if(completed){
        status = 3
    }
    Todo.findByIdAndUpdate({_id},{completed,'status':status}).then( updatedTodo => {
        res.status(200).json({'message':'Todo updated suceesfully',updatedTodo})
    }).catch( err => {
        res.status(422).json(`error:${err.message}`);
    })
})

router.post('/updateStatus',(req,res) => {
    const {_id,status} = req.body;
    let completed = false;
    if(status ===3){
        completed = true;
    }
    Todo.findByIdAndUpdate({_id},{status,completed}).then( updatedTodo => {
        res.status(200).json({'message':'Todo updated suceesfully',updatedTodo})
    }).catch( err => {
        res.status(422).json(`error:${err.message}`);
    })
})


module.exports = router;