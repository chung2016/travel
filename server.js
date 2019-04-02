const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./api/_helpers/jwt");
const errorHandler = require("./api/_helpers/error_handles");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use("/api/v1/users", require("./api/controllers/user.controller"));

// global error handler
app.use(errorHandler);
app.use((req, res, next) => {
    res.status(404).send({ message: "Sorry cant find that!" });
});
// start server
const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
