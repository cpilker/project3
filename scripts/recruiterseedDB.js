const mongoose = require("mongoose");
const db = require("../models");

// This file empties the recruiter collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/main"
);

const recruiterSeed = [
  {
    prefix: "R",
    recruiting_agency: "Recruit Hound Test",    
    street_addres1: "1 Recruit Central",    
    unit1: "A",
    city1: "Charlotte",
    state1: "NC",
    zip_code1: 28202,
    number1: "570-660-3623",
    national: true,
    description: "This is the centralized hot spot that brings you the technologist to all Recruiters in a given geographic area. Sign up today and make finding jobs 10x easier!",
    website: "recruithound.io",
    date: new Date(Date.now()),
  },
  {
    prefix: "R",
    recruiting_agency: "Teksystems",
    street_addres1: "200 South College Street",
    unit1: "Suite 1900",
    city1: "Charlotte",
    state1: "NC",
    zip_code1: 28202,
    national: true,
    description: "TEKsystems is an Allegis Group company, the largest private talent management firm in the world. Our longstanding history and industry-leading position speak to our success in providing IT staffing solutions and IT services that empower organizations to actualize ROI and sustain a truly competitive advantage in a fast-changing market.",
    website: "https://www.teksystems.com",
    date: new Date(Date.now()),
  }
];

db.Recruiter
  .remove({})
  .then(() => db.Recruiter.recruiter.insertMany(recruiterSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

