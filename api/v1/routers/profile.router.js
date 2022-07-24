const express = require('express');
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.get('/:id', profileController.getById);

module.exports = router;