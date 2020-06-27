import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const { postsAPI } = require("../../config");

export default new Vuex.Store({
	state: {
		posts: [],
		post: {},
		success: { status: "", message: "" },
		error: {}
	},
	mutations: {},
	actions: {
		async getAll({ state }) {
			return await axios
				.get(postsAPI)
				.then(async res => {
					state.posts = await res.data.posts;
				})
				.catch(err => {
					state.error = err;
					console.log(err);
				});
		},
		async addPost({ state, dispatch }, data) {
			await axios
				.post(postsAPI + "add/", data)
				.then(async res => {
					state.success = {
						status: await res.data.status,
						message: await res.data.message
					};
					dispatch("getAll");
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
					state.success = {
						status: await res.data.status,
						message: await res.data.message
					};
					dispatch("getAll");
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
					state.success = {
						status: await res.data.status,
						message: await res.data.message
					};
					dispatch("getAll");
				})
				.catch(err => {
					state.error = err;
					console.log(state.error);
				});
		}
	},
	modules: {},
	getters: {}
});
