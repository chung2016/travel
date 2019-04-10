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
app.use("/api/v1" ,jwt());

// testing
app.use("/api/v1/products", require("./api/routers/product.router"));
// api routes
app.use("/api/v1/users", require("./api/routers/user.router"));
app.use("/api/v1/attractions", require("./api/routers/attractions.router"));
app.use("/api/v1/comment", require("./api/routers/comment.router"));
app.use("/api/v1/favorite", require("./api/routers/favorite.router"));

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
