const express = require('express');

const classController = require('../controllers/classController');

const router = express.Router();

router.get('/', classController.checkCookie, classController.getClass);

// router.get('/add-student', classController.getAddStudent);

router.post('/add-student', classController.postAddStudent);

// router.get('/update/:id', classController.getEditStudent);

router.patch('/update/:id', classController.postEditStudent);

router.delete('/delete-student/:id', classController.postDeleteStudent);

router.get('/students/:id', classController.getStudent);

module.exports = router;