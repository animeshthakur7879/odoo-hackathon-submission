const expressAsyncHandler = require("express-async-handler");

//ADD AnswerS 
const addAnswer = expressAsyncHandler(async(req , res) => {


    res.json({
        msg : "Answer added"
    })
})


//GET AnswerS 
const getAnswers = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "All Answers"
    })
})

//GET SINGLE AnswerS 
const getSingleAnswer = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "SINGLE Answer"
    })
})

//UPDATE SINGLE AnswerS 
const updateAnswer = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "Update Answer"
    })
})

//DELETE SINGLE AnswerS 
const deleteAnswer = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "Delete Answer"
    })
})

module.exports = {addAnswer , getAnswers , getSingleAnswer , updateAnswer , deleteAnswer}