const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const app = express();
const port = process.env.PORT || 7700;

// use some middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// import routing components
const posts = require("./routes/posts");

// use main route
app.use("/api/posts", posts);

// Handle production
if (process.env.NODE_ENV === "production") {
	// Static folder
	app.use(express.static(__dirname + "/public/"));

	// Handle SPA
	app.get(/.*/, (req, res) => {
		res.sendFile(__dirname + "/public/index.html");
	});
}

// init the listener
app.listen(port, () => {
	console.log(`app Running on port ${port}`);
});
