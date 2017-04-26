<template>
	<div>
		<div class="vm-popup-mask" v-show="show" @click.stop="close"></div>
		<div :class="classes()" :style="styles()">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import {addClass, removeClass, getScrollview} from '../../../utils/assist';

export default {
	name: 'vm-popup',

	data() {
		return {
			show: false,
			isIOS: !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
		}
	},

	props: {
		position: { // 位置
			validator(value) {
				return ['bottom', 'center', 'left', 'right', 'top'].indexOf(value) > -1;
			},
			default: 'center'
		},
		width: {    // 宽度
			type: String,
			default: '50%'
		},
		height: {   // 高度(仅在 position = top/bottom)
			type: String,
			default: '50%'
		},
		value: {
			type: Boolean,
			default: false
		}
	},

	watch: {
		value(val) {
			if (this.isIOS) {
				if (val)
					addClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug')
				else
					removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug')
			}
			this.show = val
		}
	},

	mounted() {
		this.scrollView = getScrollview(this.$el)
	},

	methods: {
		// 设置样式
		styles() {
			if (this.position == 'left' || this.position == 'right') {
				return {width: this.width};
			} else if (this.position == 'top' || this.position == 'bottom') {
				return {width: '100%', height: this.height};
			} else {
				return {width: this.width};
			}
		},

		// 设置class
		classes() {
			return (this.position == 'center' ? 'vm-popup-center ' : 'vm-popup ') +
					(this.show ? 'popup-show ' : '') +
					'popup-' + this.position
		},

		// 关闭
		close() {
			this.isIOS && removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug')

			this.show = false
			this.$emit('input', false)
		}
	}
}
</script>

<style scoped lang="less">
.vm-popup {
	position: fixed;
	background-color: #FFF;
	z-index: 1500 + 1;
	transition: transform .3s;
	pointer-events: none;
	&.popup-left {
		transform: translate(-100%, 0);
		left: 0;
		top: 0;
		height: 100%;
	}
	&.popup-right {
		transform: translate(100%, 0);
		right: 0;
		top: 0;
		height: 100%;
	}
	&.popup-top {
		transform: translate(0, -100%);
		right: 0;
		top: 0;
	}
	&.popup-bottom {
		transform: translate(0, 100%);
		right: 0;
		bottom: 0;
	}
	&.popup-show {
		pointer-events: auto;
		transform: translate(0, 0);
	}
}

.vm-popup-center {
	background-color: #FFF;
	z-index: 1500 + 2;
	position: fixed;
	top: 50%;
	left: 50%;
	opacity: 0;
	transform: translate(-50%, -50%) scale(.8);
	transform-origin: 50% 50%;
	transition: all .1s;
	border-radius: 2px;
	pointer-events: none;
	&.popup-show {
		pointer-events: auto;
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
}

.vm-popup-mask {
	background-color: rgba(0, 0, 0, .4);
	position: fixed;
	z-index: 1500;
	bottom: 0;
	right: 0;
	left: 0;
	top: 0;
}
</style>