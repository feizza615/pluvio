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
    const image = req.body.image;

    const newReview = new Review({
        name,
        description,
        score,
        movie,
        spoiler,
        image
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
        // console.log(something);
    });


})

router.get('/movie/:id',(req,res) =>{
    var id = req.params.id;
    console.log("I have received the movie ID: " + id);

    Review.find({ movie: id }, function(err, something) {
        if (err)
            res.send(err);

        res.json(something);
        // console.log(something);
    });


})

router.get('/', (req,res) => {
    Review.find()
    .then(reviews => {
        res.json(reviews)
        // console.log(reviews)
    })
    .catch(err => res.status(400).json('Error: ' + err))
}) 

router.post('/modify/name', (req,res) => {
    const newName = req.body.newName;
    const oldName = req.body.oldName;
    console.log("Attempting to change " + oldName + " to " + newName)
    Review.updateMany({ name: oldName }, {$set: { name: newName}}, (err, user) => {
        if (err) return next(err);

        if (!user) {
            console.log("Cant find user");
        } else {
            // Added movie " + movie + " to " + name + "'s watchlist"
            console.log("Updated review name");
        }
    })

  
}) 

module.exports = router;