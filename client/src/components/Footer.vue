<template>
	<footer class="fixed-bottom text-center">
		<div class="container">
			<div class="row row-reverse">
				<div class="col-sm-12 col-md-6 my-2">&copy; 2020 - {{ author }}</div>
				<div class="col-sm-12 col-md-6 my-2">
					<div class="row">
						<div
							class="col text-primary"
							v-for="(icon, i) in [
								'facebook-square',
								'twitter-square',
								'linkedin'
							]"
							:key="i"
						>
							<fa-icon :icon="['fab', icon]" size="lg"></fa-icon>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import { author } from "../../config";

export default {
	data: () => ({ author })
};
</script>
