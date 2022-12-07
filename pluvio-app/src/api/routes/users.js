const router = require('express').Router();
let User = require('../models/User');
let bcrypt = require('bcrypt');

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

router.delete('/watchlist', (req,res,next) => {
    const name = req.body.name;
    const movie = req.body.movie;

    User.findOneAndUpdate({ name: name }, { $pull: { watchlist: movie } }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Removed " + movie);
            res.send("Removed " + movie)
        }
    })
})

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

router.post('/about', (req, res, next) => {
    const name = req.body.name;
    const about = req.body.about;

    User.findOneAndUpdate({ name: name }, { $set: { about: about } }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            
            console.log("Added");
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
        // console.log(info);
    });


}
)

router.get('/friendsid/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info[0].friends);
        // console.log(info[0].friends);
    });


}
)

router.get('/aboutid/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info[0].about);
        console.log(info[0].about);
    });


}
)

router.post('/color', (req, res, next) => {
    const name = req.body.name;
    const color = req.body.color;

    User.findOneAndUpdate({ name: name }, { $set: { color: color } }, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            res.send(color);
            
            console.log(color);
        }
    })
}
)

router.get('/color/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info[0].color);
        console.log(info[0].color);
    });


}
)


router.get('/', (req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
}) 

router.post('/modify/name', (req,res) => {
    const newName = req.body.newName;
    const oldName = req.body.oldName;
    console.log(newName)
    User.updateOne({ name: oldName }, {$set: { name: newName}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Updated name");
        }
    })

    User.updateMany({ friends: oldName }, {$push: { friends: newName}}, {$pull: {friends: oldName}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Updated name");
        }
    })

    User.updateMany({ friends: oldName }, {$pull: {friends: oldName}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Updated name");
        }
    })
}) 

router.post('/modify/email', (req,res) => {
    const newEmail = req.body.newEmail;
    const oldEmail = req.body.oldEmail;
    console.log(newEmail)
    User.updateOne({ email: oldEmail }, {$set: { email: newEmail}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Updated Email");
        }
    })
}) 


router.get('/verify/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ name: id }, function(err, info) {
        if (err)
            res.send(err);

        res.json(info);
        // console.log(info);
    });


}
)

router.get('/followers/:id', (req, res, next) => {
    var id = req.params.id;

    User.find({ friends: id }, function(err, info) {
        if (err)
            res.send(err);
            // for(let i = 0; i < info.length; i++){
        res.json(info);
            // }
        
    });


}
)

router.get('/passwordCheck/:id/:pw', (req, res, next) => {
    const usersName = req.params.id;
    const pw = req.params.pw;
    let hashed;
    User.find({name: usersName}, function(err, info) {
        if (err)
        res.send(err);

        // res.json(info);
        // console.log(info[0].password)
        hashed = info[0].password
        bcrypt.compare(pw, hashed, (err, result) => {
                res.send(result)
            })
    })

    // console.log("testing")
    
})

router.post('/changePassword', (req, res, next) => {
    const usersName = req.body.usersName;
    const newPassword = req.body.newPassword

    bcrypt.hash(newPassword, 10, (err, hashed) => {
        if (err) return (err);
        User.updateOne({name: usersName}, {$set: { password: hashed}}, function(err, info) {
            if (err)
            res.send(err);

            res.json(info);
        })
    });


})

router.post('/unfollow/:id', (req, res, next) => {
    const user = req.params.id;
    const unfollow = req.body.user;

    User.updateOne({ name: user }, {$pull: { friends: unfollow}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Removed " + unfollow);
        }
    })
})

module.exports = router;


