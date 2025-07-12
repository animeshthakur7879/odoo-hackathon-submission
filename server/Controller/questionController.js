const expressAsyncHandler = require("express-async-handler");

//ADD QUESTIONS 
const addQuestion = expressAsyncHandler(async(req , res) => {


    res.json({
        msg : "Question added"
    })
})


//GET QUESTIONS 
const getQuestions = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "All Questions"
    })
})

//GET SINGLE QUESTIONS 
const getSingleQuestion = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "SINGLE QUESTION"
    })
})

//UPDATE SINGLE QUESTIONS 
const updateQuestion = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "Update QUESTION"
    })
})

//DELETE SINGLE QUESTIONS 
const deleteQuestion = expressAsyncHandler(async(req , res) => {
    res.json({
        msg : "Delete QUESTION"
    })
})

module.exports = {addQuestion , getQuestions , getSingleQuestion , updateQuestion , deleteQuestion}