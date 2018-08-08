const mongoose = require("mongoose");
const db = require("../models");

// This file empties the recruiter collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/main");   // Establish connection to database

db.User.remove(function(err, p) {   // Empty the user model to start brand new, for dev purposes only
  if (err) {
    throw err;
  } else {
    console.log(`User model emptied!`);
  }
})

const userSeed = [
    {
        firstname: "Chad",
        lastname: "P",
        address1: "1234 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        email: "test1@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "PHP", "Python", "CSS", "jQuery"
        ],
        jobSearchStatus: "Open to opportunities"
    },
    {
        firstname: "Matt",
        lastname: "G",
        address1: "1242 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        email: "test2@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "Python", "CSS", "jQuery", "ReactJS", "Express"
        ],
        jobSearchStatus: "Not searching"
    },
    {
        firstname: "Ryan",
        lastname: "D",
        address1: "12 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        email: "test3@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "JavaScript", "Handlebars", "CSS", "jQuery", "C#"
        ],
        jobSearchStatus: "Open to opportunities"
    },
    {
        firstname: "Jimmie",
        lastname: "M",
        address1: "134 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        email: "test4@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "CSS", "jQuery", "C#", "algorithms"
        ],
        jobSearchStatus: "Open to opportunities"
    },
    {
        firstname: "Christian",
        lastname: "S",
        address1: "14 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        email: "test5@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "PHP", "Python", "CSS", "jQuery", "Javascript", "C#", "Express", "Sequel", "Mongoose"
        ],
        jobSearchStatus: "Not searching"
    }
]

console.log("About to do the db lines")

  db.User.insertMany(userSeed)//)
  .then(data => {
    console.log(data.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.log("hi")
    console.error(err);
    process.exit(1);
  });
