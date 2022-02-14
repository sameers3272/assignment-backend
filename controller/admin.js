const { validationResult } = require('express-validator/check');
const { deleteFile } = require('../middleware/fileHandler');
const Food = require('../models/food');
const User = require('../models/user');


exports.postAddFood = (req, res, next) => {
    const title = req.body.title;
    const price = +req.body.price;
    const description = req.body.description;
    const createdDate = req.body.createdDate;
    const expiredDate = req.body.expiredDate;
    const food = new Food({
        title: title,
        price: price.toFixed(2),
        createdDate,
        expiredDate,
        description: description,
    })
    return food.save((err, food) => {
        return res.json(food);
    })
}


exports.postEditFood = (req, res, next) => {
    const foodId = req.body._id;
    const updatedTitle = req.body.title;
    const updatedPrice = +req.body.price;
    const updatedDescription = req.body.description;
    const updatedCreatedDate = req.body.createdDate;
    const updatedExpiredDate = req.body.expiredDate;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return;
    }

    return Food.findById(foodId)
        .then(food => {
            food.title = updatedTitle;
            food.price = updatedPrice.toFixed(2);
            food.description = updatedDescription;
            food.createdDate = updatedCreatedDate;
            food.expiredDate = updatedExpiredDate;
            food.save((err, food) => {
                return res.json(food);
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return;
        })
}

exports.postDeleteFood = (req, res, next) => {
    const foodId = req.params.id;

    Food.findByIdAndDelete(foodId)
        .then(food => {
            return res.json({ message: "Food Successfully Deleted..!" })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}