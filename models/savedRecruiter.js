var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var savedRecruiter = new Schema({
    savedRecruiter: String    
});

// This creates our model from the above schema, using mongoose's model method
var savedRecruiter = mongoose.model("savedRecruiter", savedRecruiter);

// Export the Note model
module.exports = savedRecruiter;
