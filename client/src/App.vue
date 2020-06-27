<template>
	<div id="app">
		<Navbar />
		<b-container>
			<div class="text-center">
				<img alt="Vue logo" src="./assets/logo.png" />
				<br />
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
				<li
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
	</div>
</template>

<script>
import Navbar from "@/components/Navbar";
import DeleteModal from "@/components/Delete";
import EditModal from "@/components/Edit";
import AddModal from "@/components/Add";
import ShowModal from "@/components/Show";

import isEmpty from "is-empty";
import { mapState } from "vuex";

export default {
	name: "App",
	components: {
		Navbar,
		DeleteModal,
		EditModal,
		AddModal,
		ShowModal
	},
	data: () => ({
		postsList: [],
		currentPost: {}
	}),
	computed: mapState(["posts"]),
	watch: {
		async posts(v) {
			console.log("posts state is changed", v.length);
			// async posts(newVal, oldVal) {
			// if (newVal != oldVal) {
			// 	await this.$store.dispatch("getAll");
			// }
		}
	},
	methods: {
		isEmpty: arg => isEmpty(arg),
		async setCurrentPost(post) {
			this.currentPost = {};
			this.currentPost = await post;
		},
		async fetchAndFill() {
			await this.$store.dispatch("getAll");
			this.postsList = await this.$store.state.posts;
		}
	},
	async mounted() {
		await this.fetchAndFill();
		setInterval(async () => {
			let list = await this.$store.state.posts;
			list = [].concat(list[0]);
			list.forEach(post => {
				console.log(post.content);
			});
		}, 1000);
	}
};
</script>
