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
		async getAll({ state, getters }) {
			await getters.getAllPosts.then(async res => {
				state.posts = await res;
			});
		},
		async getPost({ state }, id) {
			return axios
				.get(postsAPI + id)
				.then(async res => {
					state.post = await res.data;
					return await state.post;
				})
				.catch(err => {
					console.log(err);
				});
		},
		async updatePost({ state }, { id, data }) {
			axios
				.put(postsAPI + id, { data })
				.then(async res => {
					state.success = res.data;
					return state.success;
				})
				.catch(err => {
					state.error = err;
					console.log(state.error);
				});
		},
		async deletePost({ state, dispatch }, id) {
			return axios
				.delete(`${postsAPI}delete/${id}`)
				.then(async res => {
					dispatch("getAll");
					state.success = res.data;
					return state.success;
				})
				.catch(err => {
					state.error = err;
					console.log(state.error);
				});
		}
	},
	modules: {},
	getters: {
		async getAllPosts() {
			return await axios
				.get(postsAPI)
				.then(async res => {
					// posts = await res.data.posts;
					return await res.data.posts;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
});
