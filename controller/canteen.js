const Food = require("../models/food");
const Order = require("../models/order");


exports.getIndex = (req, res, next) => {
    const search = req.query.search;
    let message = req.flash('logged-in-success');
    if (message.length > 0) {
        message = message[0]
    }
    else {
        message = null
    }
    Food.find({ $or: [{ title: { $regex: search ? new RegExp(`^${search}`, 'i') : '' } }] })
        .then(foods => {
            return res.json(foods);



            // res.render("canteen/index", {
            //     pageTitle: "Canteen Management System",
            //     path: '/',
            //     foods: foods,
            //     loggedIn: message,
            // });

        }).then(() => {
            req.flash = null;
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return res.json({error:err});
        })
};
