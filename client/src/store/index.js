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
		async getRes({ state }) {
			return {
				success: state.success,
				error: state.error
			};
		},
		async updatePosts({ state }, payload) {
			state.posts = payload;
		},
		async getAll({ getters, dispatch }) {
			await getters.getAllPosts.then(async res => {
				await dispatch("updatePosts", await res);
			});
			// console.log("getAll() is called");
		},
		async addPost({ state, dispatch }, data) {
			await axios
				.post(postsAPI + "add/", data)
				.then(async res => {
					state.success = await res.data;
					dispatch("getAll");
					return await state.success;
				})
				.catch(async err => {
					state.error = await err;
					console.log(await state.error);
				});
		},
		async updatePost({ state, dispatch }, { id, data }) {
			axios
				.put(`${postsAPI}update/${id}`, data)
				.then(async res => {
					state.success = await res.data;
					dispatch("getAll");
					return await state.success;
				})
				.catch(async err => {
					state.error = await err;
					console.log(await state.error);
				});
		},
		async deletePost({ state, dispatch }, id) {
			return axios
				.delete(`${postsAPI}delete/${id}`)
				.then(async res => {
					state.success = res.data;
					dispatch("getAll");
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
