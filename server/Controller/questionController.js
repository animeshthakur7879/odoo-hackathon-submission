const expressAsyncHandler = require("express-async-handler");
const Question = require("../Models/questionSchema")
//ADD QUESTIONS 
const addQuestion = expressAsyncHandler(async(req , res) => {
const { title, description, tags } = req.body;

    if (!title || !description) {
        res.status(400);
        throw new Error('Please provide title and description');
    }

    const question = await Question.create({
        title,
        description,
        tags,
        postedBy: req.user._id // assuming authMiddleware sets req.user
    });

    res.status(201).json(question);
})


//GET QUESTIONS 
const getQuestions = expressAsyncHandler(async(req , res) => {
    const questions = await Question.find()
        .populate('postedBy', 'username email') // Populate user info
        .sort({ createdAt: -1 }); // Newest first

    res.status(200).json(questions);
})

//GET SINGLE QUESTIONS 
const getSingleQuestion = expressAsyncHandler(async(req , res) => {
   const question = await Question.findById(req.params.qid)
        .populate('postedBy', 'username email');

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    res.status(200).json(question);
})

//UPDATE SINGLE QUESTIONS 
const updateQuestion = expressAsyncHandler(async(req , res) => {
  const { title, description, tags } = req.body;

    const question = await Question.findById(req.params.qid);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    // Optional: Check if the logged-in user is the one who posted it
    if (question.postedBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to update this question');
    }

    // Update fields
    question.title = title || question.title;
    question.description = description || question.description;
    question.tags = tags || question.tags;

    const updatedQuestion = await question.save();

    res.status(200).json(updatedQuestion);
})

//DELETE SINGLE QUESTIONS 
const deleteQuestion = expressAsyncHandler(async(req , res) => {
  const question = await Question.findById(req.params.qid);

    if (!question) {
        res.status(404);
        throw new Error('Question not found');
    }

    // Only the user who posted can delete
    if (question.postedBy.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to delete this question');
    }

    await question.deleteOne();

    res.status(200).json({ message: 'Question deleted successfully' });
})

module.exports = {addQuestion , getQuestions , getSingleQuestion , updateQuestion , deleteQuestion}