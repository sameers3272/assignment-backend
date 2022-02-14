const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    let fetchuser;

    if (!errors.isEmpty()) {
        return res.json({message:errors.array()[0].msg});
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json({ message: "User not Found..!" })
            }

            fetchuser = user;
            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        return res.json({ message: "password not matched..!" });
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = fetchuser;
                    return req.session.save(() => {
                        return res.json({ok:true});
                    })
                })
                
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return res.json({ err: "Error" });
        })

}


exports.postSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.json({message:errors.array()[0].msg})
    }

    bcrypt.hash(password, 12)
        .then(pass => {
            const user = new User({
                name: name,
                email: email,
                password: pass,
            });
            return user.save((err, user) => {
                return res.json({ok:true});
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return res.json({ message: "Error" });
        })
}


