const router = require('express').Router();
let User = require('../models/User');

router.post('/register',(req, res, next) => {
    data = req.body;
    User.create(data, (err, user) => {
        if (err) return next(err);
    });
});

router.post('/login', (req, res, next) => {
    let {email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/users/login');
    }

    User.findOne({email}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.redirect('/users/login');
        } else {
            res.send('Login successful');
        }
    })
})

module.exports = router;