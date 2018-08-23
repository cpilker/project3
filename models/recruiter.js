const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// TO DO: This needs to be moved out of this file and instead exported here...
let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/main")


const recruiterSchema = new Schema({
    prefix: { 
        type: String, default: "R" 
    },
    company: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
      },
    username: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String
    },
    address1: {  
        type: String,
        required: true 
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    phone1: {
        type: String,
        require: true
    },
    national: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
    website: {
        type: String,
        unique: true
    },
    lastLogin: {
        type: Date,
        default: Date.now,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
      },
    savedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "savedUser"
        }
    ],
    notes: [
        {
          // Store ObjectIds in the array
          type: Schema.Types.ObjectId,
          // The ObjectIds will refer to the ids in the Note model
          ref: "note"
        }
    ]
});

recruiterSchema.plugin(passportLocalMongoose, { 
    usernameField: 'username',
    lastLoginField: 'lastLogin',
    saltfield: 'password'
  });

const Recruiter = conn.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
