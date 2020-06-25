<template>
	<b-modal id="edit-modal" title="Edit New Post" hide-footer>
		<div class="my-1 text-capitalize">
			<b-form @submit="onSubmit" @reset="onReset">
				<b-form-group
					id="input-group-1"
					label="Post Title:"
					label-for="input-1"
					description="The post title."
				>
					<b-form-input
						id="input-1"
						v-model="title"
						type="text"
						required
						placeholder="Enter title"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-2"
					label="Post content:"
					label-for="input-2"
				>
					<b-form-textarea
						id="input-2"
						v-model="content"
						required
						placeholder="Enter content"
						rows="6"
						max-rows="10"
					></b-form-textarea>
				</b-form-group>

				<div class="text-right">
					<b-button
						class="my-2 mx-1 text-uppercase btn-danger"
						@click="$bvModal.hide('edit-modal')"
						type="reset"
					>
						<fa-icon class="mr-2" icon="broom"></fa-icon>
						<span>reset</span>
					</b-button>
					<b-button class="my-2 mx-1 text-uppercase btn-info" type="submit">
						<fa-icon class="mr-2" icon="sync-alt"></fa-icon>
						<span>update</span>
					</b-button>
				</div>
			</b-form>
		</div>
	</b-modal>
</template>

<script>
import isEmpty from "is-empty";

export default {
	props: {
		post: {
			type: Object,
			reqiured: true
		}
	},
	data: () => ({
		id: "",
		title: "",
		content: ""
	}),
	async mounted() {
		this.title = await this.post.title;
		this.content = await this.post.content;
	},
	methods: {
		async onSubmit(evt) {
			// prevent the page from reloading
			evt.preventDefault();

			// get data
			let id = await this.post._id;
			let title = await this.title;
			let content = await this.content;

			// trim data
			title = title.trim();
			content = content.trim();

			// // check & save the data
			if (!isEmpty(title) && !isEmpty(content)) {
				const data = { title, content };

				await this.$store.dispatch("updatePost", { id, data });
				await this.$bvModal.hide("edit-modal");
			}
		},
		onReset(evt) {
			// prevent the page from reloading
			evt.preventDefault();

			// Reset our form values
			this.title = "";
			this.content = "";
		}
	}
};
</script>
