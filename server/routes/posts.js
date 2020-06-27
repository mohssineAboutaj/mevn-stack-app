const { Router } = require("express");
const { ObjectID } = require("mongodb");
const Post = require("../controllers/PostController");
const router = Router();

// GET all
router.get("/", async (req, res) => {
	const result = await Post.all();

	await res.json(await result);
});

// GET one
router.get("/:id", async (req, res) => {
	const result = await Post.onePost(req.params.id);

	await res.json(await result);
});

// ADD
router.post("/add/", async function (req, res) {
	// post title
	let title = await req.body.title;
	title = await title.trim();

	// post content
	let content = await req.body.content;
	content = await content.trim();

	// post createdAt
	const createdAt = new Date();

	const inserting = await new Post().add(title, content, createdAt);

	await res.json(await inserting);
});

// UPDATE
router.put("/update/:id", async (req, res) => {
	const result = await Post.update(req.params.id, {
		title: req.body.title,
		content: req.body.content,
		updatedAt: new Date(),
	});

	await res.json(await result);
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
	const postID = await ObjectID(req.params.id);
	const deleting = await Post.delete(postID);
	await res.json(await deleting);
});

// export route
module.exports = router;
