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
    street_address1: {  
        type: Date, default: Date.now 
    },
    unit1: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    nation: {
        type: Boolean,
        default: true
    },
    description: {
        type: String
    },
    website: {
        type: website,
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
