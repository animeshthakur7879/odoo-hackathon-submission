const expressAsyncHandler = require("express-async-handler");
const Question = require("../Models/questionSchema")
const Answer = require("../Models/answerSchema")
//ADD AnswerS 
const addAnswer = expressAsyncHandler(async(req , res) => {
  const { content } = req.body;
    const questionId = req.params.qid;
    const cleanId = questionId.trim();
    const question = await Question.findById(cleanId);
    
    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    if (!content) {
        res.status(400);
        throw new Error('Answer content is required');
    }

    const answer = await Answer.create({
        content,
        question: questionId,
        postedBy: req.user._id
    });

    res.status(201).json(answer);
})


//GET AnswerS 
const getAnswers = expressAsyncHandler(async(req , res) => {
   const questionId = req.params.qid;

    const answers = await Answer.find({ question: questionId })
        .populate('postedBy', 'name email')
        .sort({ createdAt: -1 }); // newest first

    res.status(200).json(answers);
})

//GET SINGLE AnswerS 
const getSingleAnswer = expressAsyncHandler(async(req , res) => {

    console.log("🟡 Answer ID:", req.params.aid); 
      const answerId = req.params.aid;

    console.log("Fetching answer with ID:", answerId); // 🔍 Debug line

    const answer = await Answer.findById(answerId)
        .populate('postedBy', 'name email');

    if (!answer) {
        res.status(404);
        throw new Error('Answer not found');
    }

    res.status(200).json(answer);
})

//UPDATE SINGLE AnswerS 
const updateAnswer = expressAsyncHandler(async(req , res) => {
    const answerId = req.params.aid;
    const { content } = req.body;

    const answer = await Answer.findById(answerId);

    if (!answer) {
        res.status(404);
        throw new Error("Answer not found");
    }

    // ✅ Only the owner can update
    if (answer.postedBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to update this answer");
    }

    answer.content = content || answer.content;

    const updatedAnswer = await answer.save();

    res.status(200).json(updatedAnswer);
})

//DELETE SINGLE AnswerS 
const deleteAnswer = expressAsyncHandler(async(req , res) => {
   const answerId = req.params.aid;

    const answer = await Answer.findById(answerId);

    if (!answer) {
        res.status(404);
        throw new Error("Answer not found");
    }

    // ✅ Only the owner can delete
    if (answer.postedBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("Not authorized to delete this answer");
    }

    await answer.deleteOne(); // delete from DB

    res.status(200).json({ message: "Answer deleted successfully" });
})

module.exports = {addAnswer , getAnswers , getSingleAnswer , updateAnswer , deleteAnswer}