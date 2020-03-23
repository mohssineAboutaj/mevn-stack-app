const { MongoClient, ObjectID } = require('mongodb'),
			{ connectionString, dbName } = require('../config.js'),
			collectionName = "posts";

async function loadPostsCollection() {
	const client = await MongoClient.connect(connectionString + dbName, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	
	return client.db(dbName).collection(collectionName)
}

 // posts class
class Posts {

	async all() {
		const client = await MongoClient.connect(connectionString + dbName, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		return await client.db(dbName).collection(collectionName).find({}).toArray()
	}

	async add({ title, content, createdAt }) {
		const client = await MongoClient.connect(connectionString + dbName, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		
		await client.db(dbName).collection(collectionName).insertOne({
			title,
			content,
			createdAt,
		})
	}

	// delete post
	async delete(id) {
		const client = await MongoClient.connect(connectionString + dbName, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		
		await client.db(dbName).collection(collectionName).deleteOne({_id: id})
	}
}

module.exports = Posts