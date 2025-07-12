const express = require("express")
const { addAnswer, getAnswers, getSingleAnswer, updateAnswer, deleteAnswer } = require("../Controller/answerController")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/:qid" ,protect, addAnswer)
router.get("/:qid" ,protect,  getAnswers)
router.get("/:aid" ,protect,  getSingleAnswer)
router.put("/:aid" ,protect,  updateAnswer)
router.delete("/:aid" ,protect,  deleteAnswer)

module.exports = router