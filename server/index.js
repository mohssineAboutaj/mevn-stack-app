const express = require('express'),
			cors = require('cors'),
			bodyParser = require('body-parser'),
			app = express(),
			port = process.env.PORT || 7700;

// use some middleware
app.use(bodyParser.json())
app.use(cors())

// import routing components
const posts = require('./routes/posts')

// use main route
app.use('/api/posts', posts)

// init the listener
app.listen(port, () => {
	console.log(`app Running on port ${port}`)
})
