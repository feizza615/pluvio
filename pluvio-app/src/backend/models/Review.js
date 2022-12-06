let mongoose = require('mongoose');
const {User} = require('./User').schema;

const review = new mongoose.Schema({
    //user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    name: String, 
    description: String,
    score: Number,
    movie: String,
    spoiler: Boolean,
    image: String,
})

let Review = mongoose.model('Review',review);

module.exports = Review;