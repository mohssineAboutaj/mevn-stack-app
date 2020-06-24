<template>
	<b-modal id="edit-modal" title="Edit Post" hide-footer>
		<div class="my-1 text-capitalize">
			form
		</div>
		<div class="text-right">
			<b-button
				class="my-2 mx-1 text-uppercase btn-danger"
				@click="$bvModal.hide('edit-modal')"
				>cancel</b-button
			>
			<b-button
				class="my-2 mx-1 text-uppercase btn-info"
				@click="$bvModal.hide('edit-modal')"
			>
				<fa-icon icon="plus"></fa-icon>
				update
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
	}
};
</script>
