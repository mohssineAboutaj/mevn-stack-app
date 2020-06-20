const { MongoClient } = require("mongodb");
const { connectionString, dbName, postsCollection } = require("../config.js");

async function loadPostsCollection() {
	const client = await MongoClient.connect(connectionString + dbName, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client.db(dbName).collection(postsCollection);
}

// posts class
module.exports = class Posts {
	// get all posts
	static async all() {
		const client = await MongoClient.connect(`${connectionString}/${dbName}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const allPosts = await client
			.db(dbName)
			.collection(postsCollection)
			.find({})
			.toArray();

		return {
			status: 200,
			postsCount: await allPosts.length,
			posts: await allPosts,
		};
	}

	// add new post
	static async add({ title, content, createdAt }) {
		const client = await MongoClient.connect(connectionString + dbName, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const insert = await client
			.db(dbName)
			.collection(postsCollection)
			.insertOne({
				title,
				content,
				createdAt,
			});

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

	// delete post
	static async delete(id) {
		const client = await MongoClient.connect(connectionString + dbName, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const deleting = await client
			.db(dbName)
			.collection(postsCollection)
			.deleteOne({ _id: id });

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
