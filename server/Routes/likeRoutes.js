const express = require("express")
const { getLike, addLike } = require("../Controller/likeControllers")
const protect = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/:aid" ,protect, addLike)
router.get("/:aid" ,protect, getLike)


module.exports = router