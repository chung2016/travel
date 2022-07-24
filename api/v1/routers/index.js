const express = require("express");
const jwt = require("../_helpers/jwt");
const router = express.Router();
const errorHandler = require("../_helpers/error_handles");

// use JWT auth to secure the api
router.use("/", jwt());

// api routes
router.use("/users", require("./user.router"));
router.use("/profile", require("./profile.router"));
router.use("/places", require("./place.router"));
router.use("/comments", require("./comment.router"));
router.use("/upload", require("./upload.router"));

// global error handler
router.use(errorHandler);

module.exports = router;
