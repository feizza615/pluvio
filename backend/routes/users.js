const router = require('express').Router();
let User = require('../models/User');

function isEmail(email) {
    var emailFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (email !== '' && email.match(emailFormat)) { return true; }

    return false;
}

router.post('/register', (req, res, next) => {
    data = req.body;
    if (!isEmail(data.email)) return res.status(40).send('Invalid email');

    User.create(data, (err, user) => {
        if (err) return next(err);
        return res.send('User created')
    });
});

router.post('/login', (req, res, next) => {
    let { name, password } = req.body;
    if (!name || !password) {
        return res.redirect('/users/login');
    }

    User.findOne({ name }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            return res.redirect('/users/login');
        } else {
            user.checkPassword(password, (e, result) => {
                if (e) return next(err);

                if (!result) {
                    return res.redirect('/users/login')
                } else {
                    res.send(user)
                }
            })
        }
    })
})


router.post('/watchlist', (req, res, next) => {
    const name = req.body.name;
    const movie = req.body.movie;

    User.findOneAndUpdate({ name: name }, { $addToSet: { watchlist: movie } }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Added");
        }
    })
}
)

router.post('/friends', (req, res, next) => {
    const name = req.body.name;
    const friend = req.body.friend;

    User.findOneAndUpdate({ name: name }, { $addToSet: { friends: friend } }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Added " + friend);
        }
    })
}
)


router.get('/watchlistid/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info);
        console.log(info);
    });


}
)

router.get('/friendsid/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info[0].friends);
        console.log(info[0].friends);
    });


}
)

router.get('/', (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
}) 



module.exports = router;


