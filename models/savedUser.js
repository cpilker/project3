var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var savedUser = new Schema({
  // `savedUser` is of type String
  savedUser: String,
});

// This creates our model from the above schema, using mongoose's model method
var savedUser = mongoose.model("savedUser", savedUser);

// Export the Note model
module.exports = savedUser;
