let mongoose = require('mongoose');
const {User} = require('./User').schema;

const review = new mongoose.Schema({
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    description: String,
    score: Number,
    movie: mongoose.Schema.Types.Mixed,
})

let Review = mongoose.model('Review',review);

module.exports = Review;