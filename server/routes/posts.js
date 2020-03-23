const express = require('express'),
			Posts = require('../classes/postsClass'),
			router = express.Router();

// GET
router.get('/', async (req, res) => {
	const	posts = await new Posts().all()

	await res.json({
		status: 200,
		posts,
	})
})

// POST
router.post('/', async (req, res) => {
	const post = {
		title: req.body.title,
		content: req.body.content,
		createdAt: new Date(),
	}
	await new Posts().add(post)
	res.status(201).send()
})

// DELETE
router.delete('/:id', async (req, res) => {
	const postID = ObjectID(req.params.id)
	await new Posts().delete(postID)
	res.status(200).send()
})

module.exports = router