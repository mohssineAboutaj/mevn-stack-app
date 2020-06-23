import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const apiBaseUrl = "http://localhost:7700/api/";
const postsAPI = `${apiBaseUrl}posts/`;

export default new Vuex.Store({
	state: {
		posts: [],
		post: {},
		success: {},
		error: {}
	},
	mutations: {},
	actions: {
		async getPost({ post }, id) {
			return axios
				.get(postsAPI + id)
				.then(async res => {
					post = await res.data;
					return await post;
				})
				.catch(err => {
					console.log(err);
				});
		},
		async updatePost({ success, error }, { id, data }) {
			axios
				.put(postsAPI + id, { data })
				.then(async res => {
					success = res.data;
					return success;
				})
				.catch(err => {
					error = err;
					console.log(error);
				});
		},
		async deletePost({ success, error }, id) {
			return axios
				.delete(postsAPI + id)
				.then(async res => {
					success = res.data;
					return success;
				})
				.catch(err => {
					error = err;
					console.log(error);
				});
		}
	},
	modules: {},
	getters: {
		async getAllPosts() {
			return await axios
				.get(postsAPI)
				.then(async res => {
					return await res.data.posts;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
});
