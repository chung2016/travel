const express = require('express');
const router = express.Router();
const commentController = require("../controllers/comment.controller");

router.post('/', commentController.create);
router.delete('/:id', commentController.delete);
router.get('/place/:placeid', commentController.getByPlaceId);

module.exports = router;