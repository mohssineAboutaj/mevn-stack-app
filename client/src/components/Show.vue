<template>
	<b-modal id="show-modal" title="Show Post Details" hide-footer>
		<div class="card my-1">
			<div class="card-title">
				<h3 class="text-capitalize">{{ post.title }}</h3>
			</div>
			<div class="card-body">
				<p>{{ post.content }}</p>
			</div>
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
