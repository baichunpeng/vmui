<template>
	<section class="vm-flexview">
		<slot name="navbar" v-if="showNavbar">
			<vm-navbar :title="title" v-if="!!title">
				<router-link :to="link || '/'" slot="left">
					<yd-navbar-back-icon></yd-navbar-back-icon>
				</router-link>
			</vm-navbar>
		</slot>

		<section class="vm-scrollview" ref="scrollView">
			<slot></slot>
		</section>

		<slot name="tabbar"></slot>
	</section>
</template>

<script>
	export default {
		name: 'vm-layout',
		props: {
			link: String,
			title: String,
			showNavbar: {
				type: Boolean,
				default: true
			}
		}
	}
</script>

<style lang="less">
@import "../../../styles/variables";

.g-view {
	margin: 0 auto;
	max-width: @max-width;
	min-width: @min-width;
	&:before {
		content: '';
		display: block;
		width: 100%;
		height: @navbar-height;
	}
	&:after {
		content: '';
		display: block;
		width: 100%;
		height: @body-padding-bottom * 3;
	}
}

.vm-flexview {
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: @max-width;
	min-width: @min-width;
}

.vm-scrollview {
	width: 100%;
	height: 100%;
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	-webkit-overflow-scrolling: touch;
	position: relative;
	margin-bottom: -1px;
	&:after {
		content: '';
		display: block;
		width: 100%;
		height: @body-padding-bottom;
	}
}

.ios .vm-scrollview {
 	margin-top: 1px;
}

.hairline .vm-scrollview {
 	margin-top: 0.5px;
}
</style>
