const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
        type: String,
        required: true,

    },
    address1: {
        type: String,
        required: true,

    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    zip: {
        type: Number,
        required: true,

    },
      password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    created: {
          type: Date,
          default: Date.now
    },
    skill: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: false
    },
    jobSearchStatus: {
          type: String,
          required: true
    },
    savedRecruiter: [
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId,
          // The ObjectIds will refer to the ids in the Note model
          ref: "savedRecruiter"
        }
    ]    
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
