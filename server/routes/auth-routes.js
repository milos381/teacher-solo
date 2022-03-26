const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.teacherList)

// router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

// router.get('/signup', authController.getSignup);

router.post('/signup', authController.validate, authController.postSignup);

router.post('/logout', authController.postLogout);

// router.get('/:id', authController.info);

module.exports = router;