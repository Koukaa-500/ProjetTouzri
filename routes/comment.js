const express = require ('express');
const router = express.Router();
// const comment = require('../models/comment');
const task = require('../models/task')




//add comment mara o5ra TEMCHI MRIGLA
router.post('/addComment/:taskId', async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const t = await task.findById(taskId);

        if (!t) {
            return res.status(404).json({ message: 'Task not found!' });
        }

        const data = req.body;
        t.comments.push(data); // Directly add comment data to the task

        await t.save();

        res.status(200).json({ message: 'Comment added successfully!' });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send(error);
    }
});



// delete comment TEMCHI MRIGLA
router.delete('/deleteComment/:auteur', async (req, res) => {
    try {
        const auteur = req.params.auteur;

        // Find the task containing the comment with the specified auteur
        const t = await task.findOne({ 'comments.auteur': auteur });

        if (!t) {
            return res.status(404).json("The Comment is not Found");
        }

        // Find the index of the comment with the specified auteur
        const commentIndex = t.comments.findIndex(comment => comment.auteur === auteur);

        if (commentIndex === -1) {
            return res.status(404).json("The Comment is not Found");
        }

        // Remove the comment from the array
        t.comments.splice(commentIndex, 1);

        // Save the updated task
        await t.save();

        res.status(200).json("The Comment has been deleted Successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});

//edit comment TEMCHI MRIGLA
router.put('/editComment/:auteur', async (req, res) => {
    try {
        const auteur = req.params.auteur;
        const newCom = req.body.commentaire;

        // Find the task containing the comment with the specified auteur
        const t = await task.findOne({ 'comments.auteur': auteur });

        if (!t) {
            return res.status(404).json("The Comment is not Found");
        }

        // Find the index of the comment with the specified auteur
        const commentIndex = t.comments.findIndex(comment => comment.auteur === auteur);

        if (commentIndex === -1) {
            return res.status(404).json("The Comment is not Found");
        }

        // Update the comment text in the array
        t.comments[commentIndex].commentaire = newCom;

        // Save the updated task
        await t.save();

        res.status(200).json("The Comment has been updated Successfully");
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router ;