const express = require("express")
const {  getQuestions, getSingleQuestion, updateQuestion, deleteQuestion, addQuestion } = require("../Controller/questionController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/" ,protect, addQuestion)
router.get("/" ,protect, getQuestions)
router.get("/:qid" ,protect, getSingleQuestion)
router.put("/:qid" ,protect, updateQuestion)
router.delete("/:qid" ,protect, deleteQuestion)

module.exports = router