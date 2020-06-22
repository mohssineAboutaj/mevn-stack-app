const PostsDB = require("../models/PostsDB");

// posts class
module.exports = class Posts {
	// get all posts
	static async all() {
		const client = await new PostsDB().connect();

		const allPosts = await client.find({}).toArray();

		return {
			status: 200,
			postsCount: await allPosts.length,
			posts: await allPosts,
		};
	}

	// add new post
	async add(title, content, createdAt) {
		const client = await new PostsDB().connect();

		const insert = await client.insertOne({ title, content, createdAt });

		if (await insert.insertedCount) {
			return {
				status: 200,
				message: "inserted successfuly",
			};
		} else {
			return {
				status: 401,
				message: "inserted failed",
			};
		}
	}

	// get one post
	static async onePost(id) {
		const client = await new PostsDB().connect();

		const postData = await client.findOne({}, { _id: id });

		return await postData;
	}

	// update post
	static async update(id, newPostData) {
		const client = await new PostsDB().connect();
		const postToUpdate = await this.onePost(id);

		const updating = await client.updateOne(postToUpdate, {
			$set: newPostData,
		});

		if ((await updating.matchedCount) && (await updating.modifiedCount)) {
			return {
				status: 200,
				message: "updated successfuly",
			};
		} else {
			return {
				status: 401,
				message: "updated failed",
			};
		}
	}

	// delete post
	static async delete(id) {
		const client = await new PostsDB().connect();

		const deleting = await client.deleteOne({ _id: id });

		if (await deleting.deletedCount) {
			return {
				status: 200,
				message: "deleted successfuly",
			};
		} else {
			return {
				status: 401,
				message: "deleted failed",
			};
		}
	}
};
