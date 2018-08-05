const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        validate: {
          len: [1]
        }
    },
    lastname: {
        type: String,
        required: true,
        validate: {
          len: [1]
        }
    },
    address1: {
        type: String,
        required: true,
        validate: {
          len: [1]
        }
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
        validate: {
          len: [1, 2]
        }
    },
    zip: {
        type: int,
        required: true,
        validate: {
          len: [1, 5]
        }
    },
      password: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        validate: {
          len: [1],
          isEmail: true
        }
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
}),

const User = mongoose.model("User", userSchema);

module.exports = User;
