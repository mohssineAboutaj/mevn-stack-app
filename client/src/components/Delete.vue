<template>
	<b-modal id="delete-modal" title="Delete Post" hide-footer>
		<div class="my-1 text-capitalize">
			<p>
				Are you sure you want to delete the post <b>{{ post.title }} </b>
			</p>
		</div>
		<div class="text-right">
			<b-button
				class="my-2 mx-1 text-uppercase btn-primary"
				@click="$bvModal.hide('delete-modal')"
			>
				<fa-icon class="mr-2" icon="times"></fa-icon>
				<span>close</span>
			</b-button>
			<b-button
				class="my-2 mx-1 text-uppercase btn-danger"
				@click="
					$bvModal.hide('delete-modal');
					deletePost(post._id);
				"
			>
				<fa-icon class="mr-2" icon="trash"></fa-icon>
				<span>delete</span>
			</b-button>
		</div>
	</b-modal>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			reqiured: true
		}
	},
	methods: {
		async deletePost(id) {
			await this.$store.dispatch("deletePost", id);
		}
	}
};
</script>
