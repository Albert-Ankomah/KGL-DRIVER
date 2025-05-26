import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    confirmPassword: { type: String, required: true, minlength: 6 }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    if (this.password !== this.confirmPassword) {
        return next(new Error('Passwords do not match'));
    }

    if (this.password.length < 6) {
        return next(new Error('Password must be at least 6 characters long'));
    }

    next();
});

const User = mongoose.model('User', userSchema)

module.exports = User