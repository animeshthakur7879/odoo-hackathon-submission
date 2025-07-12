const express = require("express")
const { addQuestion, getQuestions, getSingleQuestion, updateQuestion, deleteQuestion } = require("../Controller/questionController")

const router = express.Router()

router.post("/" , addQuestion)
router.get("/" , getQuestions)
router.get("/:qid" , getSingleQuestion)
router.put("/:qid" , updateQuestion)
router.delete("/:qid" , deleteQuestion)

module.exports = router