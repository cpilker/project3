const router = require("express").Router();
const routes = require("./api");

router.use("/api", routes);

module.exports = router;