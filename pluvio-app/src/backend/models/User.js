let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require:true, unique: true},
    email: {type:String, require:true, unique:true},
    password: {type:String,require:true,minLength:5},
    watchlist: [Number],
    friends: [String],
    about: String,
    color: String,
});

userSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if (err) return next(err);
            this.password = hashed;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, result) => {
        return cb(err, result);
    })
}

let User = mongoose.model('User',userSchema);

module.exports = User;