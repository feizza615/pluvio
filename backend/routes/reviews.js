const router = require('express').Router();
const { trusted } = require('mongoose');
let Review = require('../models/Review');
let User = require('../models/User')

router.post('/add',(req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const score = req.body.score;
    const movie = req.body.movie;
    const spoiler = req.body.spoiler;

    const newReview = new Review({
        name,
        description,
        score,
        movie,
        spoiler
    })

    newReview.save()
        .then(async () => { 
            res.send("Review added!")
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

router.get('/user/:id',(req,res) =>{
    var id = req.params.id;
    console.log("I have received the ID: " + id);

    Review.find({ name: id }, function(err, something) {
        if (err)
            res.send(err);

        res.json(something);
        console.log(something);
    });


})


module.exports = router;