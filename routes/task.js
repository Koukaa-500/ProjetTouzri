const express = require ('express');
const router = express.Router();
const user = require('../models/User');
const task = require('../models/task');

//methode creerTache()  TEMCHI Mrigla
router.post('/createTask' , async(req,res)=>{
    try{
        data = req.body;
        t = new task(data);
        savedTask = await t.save();

        res.status(200).send(savedTask);
    }catch(error){
        res.status(400).send(error);
    }
})

//methode updateTask() TEMCHI Mrigla
router.put('/updateTask/:id' ,async(req,res)=>{
    try{
        id=req.params.id;
        newTask = req.body;
        updatedTask = await task.findByIdAndUpdate({_id:id},newTask)
        res.status(200).send(updatedTask)
    }catch(error){
        res.status(400).send(error)
    }
    
})
//methode deleteTask() TEMCHI Mrigla 

router.delete('/deleteTask/:id' , async(req,res)=>{
    try {
        id = req.params.id;
        t = await task.findOneAndDelete({_id:id});
        res.status(200).send(t)
    }catch(error){
        res.status(400).send(error)
    }
})

//methode assignParticipant TEMCHI Mrigla
router.put('/assignParticipant/:taskId/:userId', async (req, res) => {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    try {
        const t = await task.findById(taskId);

        if (!t) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        const u = await user.findById(userId);

        if (!u) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if the user is already assigned to this task
        if (t.participants.some(participant => participant.equals(userId))) {
            return res.status(409).json({ message: 'User has been already assigned' });
        }

        t.participants.push(userId)  // Convert userId to ObjectId
        const updatedTask = await t.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error in assigning user to task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;







