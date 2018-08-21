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
        jobSearchStatus: "Not Searching",
        password: "password",
        username: "test1@test.com",
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
        username: "test2@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "Python", "CSS", "jQuery", "ReactJS", "Express"
        ]
    },
    {
        firstname: "Ryan",
        lastname: "D",
        address1: "12 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test3@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "JavaScript", "Handlebars", "CSS", "jQuery", "C#"
        ]
    },
    {
        firstname: "Jimmie",
        lastname: "M",
        address1: "134 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        password: "password",
        username: "test4@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "CSS", "jQuery", "C#", "algorithms"
        ]
    },
    {
        firstname: "Christian",
        lastname: "S",
        address1: "14 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test5@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "PHP", "Python", "CSS", "jQuery", "Javascript", "C#", "Express", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "John",
        lastname: "Doe",
        address1: "123 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test6@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "PHP", "Python", "CSS", "jQuery", "Javascript", "C#", "Express", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jane",
        lastname: "Doe",
        address1: "123 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test7@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "Python", "CSS", "jQuery", "Javascript", "C#", "Express", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Janey",
        lastname: "Doe",
        address1: "1234 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test8@test.com",
        date: new Date(Date.now()),
        skill: [
            "Python", "CSS", "jQuery", "Javascript", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jonathan",
        lastname: "Doe",
        address1: "1234 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test9@test.com",
        date: new Date(Date.now()),
        skill: [
            "Java", "Python", "CSS", "jQuery", "Javascript", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jonathan",
        lastname: "D",
        address1: "12324 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test9@test.com",
        date: new Date(Date.now()),
        skill: [
            "Java", "Python", "CSS", "jQuery", "Javascript", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jonathan",
        lastname: "Dkjkj",
        address1: "1324 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test9@test.com",
        date: new Date(Date.now()),
        skill: [
            "Java", "CSS", "jQuery", "Javascript", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jack be Nimble",
        lastname: "Dkjkj",
        address1: "1324 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test11@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "CSS", "jQuery", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jack be Nimble",
        lastname: "Quam",
        address1: "24 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test10@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "CSS", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jack be Nimble",
        lastname: "Quatro",
        address1: "214 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test14@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Howdy",
        lastname: "Quatro",
        address1: "90 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test12@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Howdy",
        lastname: "Ho",
        address1: "94 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test13@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jimmy",
        lastname: "Crickets",
        address1: "49 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test15@test.com",
        date: new Date(Date.now()),
        skill: [
            "HTML", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Jimmy",
        lastname: "Elephant",
        address1: "74 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Not Searching",
        password: "password",
        username: "test16@test.com",
        date: new Date(Date.now()),
        skill: [
            "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Ryan the",
        lastname: "Man",
        address1: "76 Main St",
        city: "Charlotte",
        state: "NC",
        zip: 28202,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test17@test.com",
        date: new Date(Date.now()),
        skill: [
            "jquery", "C#", "Sequel", "Mongoose"
        ]
    },
    {
        firstname: "Chad the",
        lastname: "Plan",
        address1: "5 West St",
        city: "Huntersville",
        state: "NC",
        zip: 28078,
        jobSearchStatus: "Actively Searching",
        password: "password",
        username: "test19@test.com",
        date: new Date(Date.now()),
        skill: [
            "jquery", "C#", "Sequel", "HTML"
        ]
    },
    {
        firstname: "Matt the",
        lastname: "One",
        address1: "5 East St",
        city: "Huntersville",
        state: "NC",
        zip: 28078,
        jobSearchStatus: "Not Searching",
        password: "password",
        username: "test18@test.com",
        date: new Date(Date.now()),
        skill: [
            "jquery", "C#", "Sequel", "HTML"
        ]
    },
    {
        firstname: "Christian the",
        lastname: "Only",
        address1: "5 South St",
        city: "Huntersville",
        state: "NC",
        zip: 28078,
        jobSearchStatus: "Open to Opportunities",
        password: "password",
        username: "test20@test.com",
        date: new Date(Date.now()),
        skill: [
            "express", "jquery", "C#", "Sequel", "HTML"
        ]
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
