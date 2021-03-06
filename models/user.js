const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// TO DO: This needs to be moved out of this file and instead exported here...
let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/main")

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
  linkedin: {
    type: String,
    required: false
  },
  git: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  skill: [
    String
  ],
  resume: {
    type: String,
    required: false
  },
  jobSearchStatus: {
    type: String,
    required: false,
    default: "Not Searching"
  },
  lastLogin: {
    type: Date,
    default: Date.now,
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

userSchema.plugin(passportLocalMongoose, { 
  usernameField: 'username',
  lastLoginField: 'lastLogin',
  saltField: 'password'
});


const User = conn.model("User", userSchema);

module.exports = User;
