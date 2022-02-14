const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controller/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


router.post('/add-food',
    // [
    //     body('title').isLength({ min: 3 }).withMessage('Title Should be atleast 3 characters')
    //         .isAlphanumeric('en-IN', { ignore: " " }).withMessage('Only text and numbers are allowed for Title'),
    //     body('description').isLength({ min: 5 }).withMessage('Descripition should be atleast 5 characters'),
    // ]

     adminController.postAddFood);


router.put('/edit-food',
    // [
    //     body('title').isLength({ min: 3 }).withMessage('Title Should be atleast 3 characters')
    //         .isAlphanumeric('en-IN', { ignore: " " }).withMessage('Only text and numbers are allowed for Title'),
    //     body('description').isLength({ min: 5 }).withMessage('Descripition should be atleast 5 characters'),
    // ]
     adminController.postEditFood);

router.delete('/delete-food/:id', adminController.postDeleteFood);


module.exports = router;