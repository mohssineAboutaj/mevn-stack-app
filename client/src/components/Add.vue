<template>
	<b-modal id="add-modal" title="Add new Post" hide-footer>
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
						autofocus
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
						type="reset"
						variant="danger"
						class="my-2 mx-1 text-uppercase"
					>
						<fa-icon class="mr-2" icon="broom"></fa-icon>
						<span>reset</span>
					</b-button>
					<b-button
						type="submit"
						variant="primary"
						class="my-2 mx-1 text-uppercase"
					>
						<fa-icon class="mr-2" icon="save"></fa-icon>
						<span>save</span>
					</b-button>
				</div>
			</b-form>
		</div>
	</b-modal>
</template>

<script>
import isEmpty from "is-empty";

export default {
	data: () => ({
		title: "",
		content: ""
	}),
	methods: {
		async onSubmit(evt) {
			// prevent the page from reloading
			evt.preventDefault();

			// get data
			let title = this.title;
			let content = this.content;

			// trim data
			title = title.trim();
			content = content.trim();

			// check & save the data
			if (!isEmpty(title) && !isEmpty(content)) {
				await this.$store.dispatch("addPost", { title, content });
				await this.$bvModal.hide("add-modal");
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
