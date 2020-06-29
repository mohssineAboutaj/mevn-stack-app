<template>
	<b-modal id="show-modal" title="Show Post Details" hide-footer>
		<div class="card my-1">
			<div class="card-title">
				<h3 class="text-capitalize">{{ post.title }}</h3>
			</div>
			<div class="card-body">
				<p>{{ post.content }}</p>
			</div>
			<div class="card-footer text-capitalize">
				<div class="row">
					<div :class="post.updatedAt ? 'col-sm-12 col-md-6' : ''">
						<small>
							<fa-icon icon="calendar-alt"></fa-icon>
							<span class="mx-1"
								>created at: {{ formatDate(post.createdAt) }}</span
							>
						</small>
					</div>
					<div v-if="post.updatedAt" class="col-sm-12 col-md-6">
						<small>
							<fa-icon icon="calendar-alt"></fa-icon>
							<span class="mx-1"
								>updated at: {{ formatDate(post.updatedAt) }}</span
							>
						</small>
					</div>
				</div>
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
	},
	methods: {
		formatDate(dateFromParam) {
			let date = new Date(dateFromParam);

			const y = date.getFullYear();
			const mo = date.getMonth();
			const d = date.getDay();
			const h = date.getHours();
			const mi = date.getMinutes();

			return `${y}-${mo}-${d} ${h}:${mi}`;
		}
	}
};
</script>
