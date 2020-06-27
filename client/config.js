// import some modules & main package.json
const pkg = require("../package.json");
const path = require("path");

// API configuration
const apiBase = "http://localhost:7700/";
const apiBaseUrl = `${apiBase}api/`;
const postsAPI = `${apiBaseUrl}posts/`;

// other config
const title = "Manchour - MEVN app";
// const description =
// 	"A simple posts app (like todo list app), build using MEVN stack (Mongodb, Expressjs, Vuejs, Nodejs), it's using CRUD functionalities";

// developement
const port = 7701;

// directories & static files
const outputDir = path.resolve(__dirname, "../server/public");

// export
module.exports = {
	apiBase,
	apiBaseUrl,
	postsAPI,
	outputDir,
	title,
	description: pkg.description,
	port,
	author: pkg.author
};
