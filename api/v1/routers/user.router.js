const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/', userController.getAll);
router.get('/current', userController.getCurrent);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;