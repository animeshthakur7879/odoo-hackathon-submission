const express = require("express")
const { addAnswer, getAnswers, getSingleAnswer, updateAnswer, deleteAnswer } = require("../Controller/answerController")

const router = express.Router()

router.post("/:qid" , addAnswer)
router.get("/:qid" , getAnswers)
router.get("/:aid" , getSingleAnswer)
router.put("/:aid" , updateAnswer)
router.delete("/:aid" , deleteAnswer)

module.exports = router