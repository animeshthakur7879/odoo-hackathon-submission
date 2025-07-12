const expressAsyncHandler = require("express-async-handler");
const Answer = require("../Models/answerSchema")
//ADD AnswerS 
const addLike = expressAsyncHandler(async(req , res) => {

   const answer = await Answer.findById(req.params.id);

    if (!answer) {
        res.status(404);
        throw new Error("Answer not found");
    }

    const userId = req.user._id;

    if (answer.likes.includes(userId)) {
        res.status(400);
        throw new Error("You have already liked this answer");
    }

    answer.likes.push(userId);
    await answer.save();

    res.status(200).json({ message: "Liked successfully" });
})


//GET AnswerS 
const getLike = expressAsyncHandler(async(req , res) => {
    const answerId = req.params.id;

    const answer = await Answer.findById(answerId);

    if (!answer) {
        res.status(404);
        throw new Error("Answer not found");
    }

    const likeCount = answer.likes.length;

    res.status(200).json({ totalLikes: likeCount }); 
})



module.exports = {addLike , getLike }