const router = require("express").Router();
// const userRoutes = require("./user");
// const recruiterRoutes = require("./recruiter");
const passportRoutes = require("./passport-routes");

// router.use("/api/user", userRoutes);
// router.use("/recruiter", recruiterRoutes);
router.use("/api/signin", passportRoutes);

module.exports = router;