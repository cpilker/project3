const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    prefix: { 
        type: String, default: "R" 
    },
    recruiting_agency: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    password: {
        type: String
    },
    street_address1: {  
        type: String,
        required: true 
    },
    unit1: {
        type: String,
        required: false
    },
    city1: {
        type: String,
        required: true
    },
    state1:{
        type: String,
        required: true
    },
    zip_code1: {
        type: Number,
        required: true
    },
    number1: {
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
    date: {
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

const Recruiter = mongoose.model("Recruiter", recruiterSchema);

module.exports = Recruiter;
