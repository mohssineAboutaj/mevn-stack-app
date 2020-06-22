const { postsCollection } = require("../config");
const DataBase = require("./Database");

module.exports = class PostsDB extends DataBase {
	async connect() {
		const connect = await this.mainConnection();
		return await connect.collection(postsCollection);
	}
};
