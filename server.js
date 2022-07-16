require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./api/_helpers/jwt");
const errorHandler = require("./api/_helpers/error_handles");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const distPath = process.env.NODE_ENV === 'production' ? '' : '/assignment';

app.use(express.static(`${__dirname}/dist${distPath}`));
app.use(cors());

// use JWT auth to secure the api
app.use("/api/v1", jwt());

// api routes
app.use("/api/v1/users", require("./api/routers/user.router"));
app.use("/api/v1/profile", require("./api/routers/profile.router"));
app.use("/api/v1/places", require("./api/routers/place.router"));
app.use("/api/v1/comments", require("./api/routers/comment.router"));
app.use("/api/v1/upload", require("./api/routers/upload.router"));
app.use("/api/v1/third", require("./api/routers/third.router"));
app.get('/*', function (req, res) {
	res.sendFile(path.join(`${__dirname}/dist${distPath}/index.html`));
});

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
	console.log("Server listening on port " + port);
});
