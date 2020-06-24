<template>
	<b-modal id="add-modal" title="Add new Post" hide-footer>
		<div class="my-1 text-capitalize">
			<b-form @submit="onSubmit" @reset="onReset" v-if="show">
				<b-form-group
					id="input-group-1"
					label="Post Title:"
					label-for="input-1"
					description="The post title."
				>
					<b-form-input
						id="input-1"
						v-model="form.title"
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
					<b-form-input
						id="input-2"
						v-model="form.content"
						required
						placeholder="Enter content"
					></b-form-input>
				</b-form-group>

				<div class="text-right">
					<b-button
						type="reset"
						variant="danger"
						class="my-2 mx-1 text-uppercase"
						@click="$bvModal.hide('add-modal')"
					>
						<fa-icon class="mr-2" icon="times"></fa-icon>
						<span>close</span>
					</b-button>
					<b-button
						type="submit"
						variant="primary"
						class="my-2 mx-1 text-uppercase"
						@click="
							$bvModal.hide('add-modal');
							addPost(post._id);
						"
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
export default {
	data() {
		return {
			form: {
				title: "",
				content: ""
			},
			show: true
		};
	},
	methods: {
		addPost() {
			console.log("add");
		},
		onSubmit(evt) {
			evt.preventDefault();
			alert(JSON.stringify(this.form));
		},
		onReset(evt) {
			evt.preventDefault();
			// Reset our form values
			this.form.title = "";
			this.form.content = "";
			this.form.food = null;
			this.form.checked = [];
			// Trick to reset/clear native browser form validation state
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		}
	}
};
</script>
