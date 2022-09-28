const router = require('express').Router();
let User = require('../models/User');

function isEmail(email) {
    var emailFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}

router.post('/register',(req, res, next) => {
    data = req.body;
    if (!isEmail(data.email)) return res.status(40).send('Invalid email');

    User.create(data, (err, user) => {
        if (err) return next(err);
        return res.send('User created')
    });
});

router.post('/login', (req, res, next) => {
    let {name, password } = req.body;
    if (!name || !password) {
        return res.redirect('/users/login');
    }

    User.findOne({name,password}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.redirect('/users/login');
        } else {
            res.send('Login successful');
        }
    })
})

module.exports = router;