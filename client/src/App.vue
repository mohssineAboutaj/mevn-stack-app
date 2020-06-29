<template>
	<div id="app">
		<Navbar />
		<b-container>
			<div class="text-center">
				<img alt="Vue logo" src="./assets/logo.png" class="d-inline-block" />
				<div class="response-messages">
					<b-toast id="success-toast" variant="info">{{ successMsg }}</b-toast>
					<b-toast id="error-toast" variant="danger">{{ errorMsg }}</b-toast>
				</div>
			</div>
			<ul class="list-group text-capitalize">
				<li
					class="list-group-item d-flex justify-content-between align-items-center active"
				>
					posts list
					<span class="badge-pill">
						<span class="add-new-action">
							<button
								class="btn btn-primary text-uppercase mx-1"
								v-b-modal.add-modal
								id="add-new-post"
							>
								<fa-icon class="mx-1" icon="plus"></fa-icon>
								<span>new</span>
							</button>
							<b-tooltip
								target="add-new-post"
								title="Add New Post"
								placement="top"
								noninteractive
							></b-tooltip>
						</span>
					</span>
				</li>
				<li v-if="postsList.length == 0" class="list-group-item">
					<h6 class="my-2 text-center text-capitalize">
						there is no posts yet!
					</h6>
				</li>
				<li
					v-else
					v-for="post in postsList"
					:key="post._id"
					class="list-group-item d-flex justify-content-between align-items-center"
				>
					<span class="text-primary">
						<span class="mr-2 text-left">
							<fa-icon icon="file-alt"></fa-icon>
						</span>
						<span>{{ post.title }}</span>
					</span>
					<span class="badge-pill">
						<span class="edit-action">
							<button
								class="btn btn-warning btn-sm mx-1"
								v-b-modal.show-modal
								@click="setCurrentPost(post)"
								:id="'show-' + post._id"
							>
								<fa-icon icon="eye"></fa-icon>
							</button>
							<b-tooltip
								:target="'show-' + post._id"
								title="Show Details"
								placement="top"
								noninteractive
							></b-tooltip>
						</span>
						<span class="edit-action">
							<button
								class="btn btn-info btn-sm mx-1"
								v-b-modal.edit-modal
								@click="setCurrentPost(post)"
								:id="'edit-' + post._id"
							>
								<fa-icon icon="edit"></fa-icon>
							</button>
							<b-tooltip
								:target="'edit-' + post._id"
								title="Edit Post"
								placement="top"
								noninteractive
							></b-tooltip>
						</span>
						<span class="delete-action">
							<button
								class="btn btn-danger btn-sm mx-1"
								v-b-modal.delete-modal
								@click="setCurrentPost(post)"
								:id="'delete-' + post._id"
							>
								<fa-icon icon="trash"></fa-icon>
							</button>
							<b-tooltip
								:target="'delete-' + post._id"
								title="Delete Post"
								placement="top"
								noninteractive
							></b-tooltip>
						</span>
					</span>
				</li>
			</ul>
		</b-container>
		<DeleteModal v-if="!isEmpty(currentPost)" :post="currentPost" />
		<EditModal v-if="!isEmpty(currentPost)" :post="currentPost" />
		<ShowModal v-if="!isEmpty(currentPost)" :post="currentPost" />
		<AddModal />
		<Footer />
	</div>
</template>

<script>
// import some components to use in the template
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeleteModal from "@/components/Delete";
import EditModal from "@/components/Edit";
import AddModal from "@/components/Add";
import ShowModal from "@/components/Show";

// import something from Vuex
import { mapState } from "vuex";

// import some packages/helpers
import isEmpty from "is-empty";
import toTitleCase from "to-title-case";

export default {
	name: "App",
	components: {
		Navbar,
		Footer,
		DeleteModal,
		EditModal,
		AddModal,
		ShowModal
	},
	data: () => ({
		postsList: [],
		currentPost: {},
		successMsg: "",
		errorMsg: ""
	}),
	computed: mapState(["posts", "success", "error"]),
	watch: {
		async posts(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.postsList = newVal;
			}
		},
		async success(val) {
			this.successMsg = toTitleCase(val.message);
			this.$bvToast.show("success-toast");
		},
		async error(val) {
			this.errorMsg = await val.message;
			await this.$bvToast.show("error-toast");
		}
	},
	methods: {
		isEmpty: arg => isEmpty(arg),
		async setCurrentPost(post) {
			this.currentPost = {};
			this.currentPost = await post;
		}
	},
	async mounted() {
		await this.$store.dispatch("getAll");
	}
};
</script>
