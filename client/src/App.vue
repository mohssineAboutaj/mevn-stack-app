<template>
	<div id="app">
		<Navbar />
		<b-container>
			<div class="text-center">
				<img alt="Vue logo" src="./assets/logo.png" />
			</div>
			<ul class="list-group text-capitalize">
				<li class="list-group-item active">posts list</li>
				<li
					v-for="post in posts"
					:key="post._id"
					class="list-group-item d-flex justify-content-between align-items-center"
				>
					{{ post.title }}
					<span class="badge-pill">
						<button class="btn btn-info btn-sm mx-1">
							<fa-icon icon="edit"></fa-icon></button
						><button class="btn btn-danger btn-sm mx-1">
							<fa-icon icon="trash"></fa-icon>
						</button>
					</span>
				</li>
			</ul>
		</b-container>
	</div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
	name: "App",
	components: {
		Navbar
	},
	data: () => ({
		posts: []
	}),
	async beforeMount() {
		await this.$store.getters.getAllPosts.then(res => {
			res.forEach(element => {
				this.posts.push(element);
			});
		});
	}
};
</script>
