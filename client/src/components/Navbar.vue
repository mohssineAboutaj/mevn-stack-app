<template>
	<b-navbar toggleable="md" type="dark" variant="dark">
		<b-navbar-brand
			href="#"
			class="text-capitalize"
			v-text="'manchour - MEVN app'"
		></b-navbar-brand>

		<b-navbar-toggle target="nav-collapse">
			<fa-icon icon="bars"></fa-icon>
		</b-navbar-toggle>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto text-uppercase">
				<b-nav-item href="#">
					<fa-icon icon="plus" class="mr-1"></fa-icon>
					<span>new post</span>
				</b-nav-item>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>
