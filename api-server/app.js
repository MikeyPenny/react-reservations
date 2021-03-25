const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT;

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.log(`Not connected to DB ${err}`);
	});

app.use(
	cors({
		origin: ["http://localhost:3000", "localhost:3000"],
		credentials: true,
	})
);

app.use(
	session({
		secret: process.env.cookieSecret,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/reservation", require("./routes/reservation"));

app.listen(port, () => {
	console.log(`Listening at port: ${port}`);
});

module.exports = app;
