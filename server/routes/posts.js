const { Router } = require("express");
const { ObjectID } = require("mongodb");
const Posts = require("../classes/PostClass");
const router = Router();

// GET
router.get("/", async (req, res) => {
	const result = await Posts.all();

	await res.json(await result);
});

// ADD
router.post("/", async function (req, res) {
	// post title
	let title = await req.body.title;
	title = await title.trim();

	// post content
	let content = await req.body.content;
	content = await content.trim();

	// post createdAt
	const createdAt = new Date();

	const post = { title, content, createdAt };

	const inserting = await Posts.add(post);

	await res.json(await inserting);
});

// DELETE
router.delete("/:id", async (req, res) => {
	const postID = await ObjectID(req.params.id);
	const deleting = await Posts.delete(postID);
	await res.json(await deleting);
});

// export route
module.exports = router;
