const { MongoClient } = require("mongodb");
const { connectionString, dbName } = require("../config.js");

module.exports = class DataBase {
	async mainConnection() {
		const client = await MongoClient.connect(`${connectionString}/${dbName}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		return client.db(dbName);
	}
};
