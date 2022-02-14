const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Mongodb_Store = require('connect-mongodb-session')(session);
const MONGODB_URI = require('./util/database');
const cors = require('cors');

const helmet = require('helmet');
const compression = require('compression');
const flash = require('connect-flash');

const adminRoutes = require('./routes/admin');
const canteenRoutes = require('./routes/canteen');
const authRoutes = require('./routes/auth');
const errorController = require('./controller/error');
const User = require('./models/user');

const app = express();
require("dotenv").config();

const store = new Mongodb_Store({
    uri: MONGODB_URI
});



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(flash());




app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            return next();
        })
        .catch(err => console.log(err));
});



// app.use((req, res, next)=> {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers','Origin','X-Requested-With', 'Content-Type','Accept','Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     res.setHeader("Cross-Origin-Resource-Policy","same-site")
//     next();
//   });


app.use('/admin', adminRoutes);
app.use(canteenRoutes);
app.use(authRoutes);


app.use(errorController.get404)

// app.use((errors, req, res, next) => {
//     console.log(errors);
//     res.status(500).render('500', {
//         pageTitle: "Error!",
//         path: '/500',
//     });
//     next();
// })





mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected');
        app.listen(process.env.PORT || 5000);
    })
    .catch(err => console.log(err));

