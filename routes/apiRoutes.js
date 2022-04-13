const express = require("express");

const router = express.Router();

router.use("/users", require("./userRoutes"));
router.use("/docs", require("./docRoutes"));

module.exports = router;
