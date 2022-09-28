const router = require('express').Router();
const { trusted } = require('mongoose');
let Review = require('../models/Review');
let User = require('../models/User')

router.post('/add',(req, res, next) => {
    const user = req.body.user;
    const description = req.body.description;
    const score = req.body.score;
    const movie = req.body.movie;

    const newReview = new Review({
        user,
        description,
        score,
        movie,
    })

    newReview.save()
        .then(async () => { 
            res.send("Review added!")
        })
        .catch(err => res.status(400).json('Error: ' + err))
});


module.exports = router;