const router = require("express").Router();
const userRoutes = require("./user");
const recruiterRoutes = require("./recruiter");

router.use("/user", userRoutes);
router.use("/recruiter", recruiterRoutes);

module.exports = router;