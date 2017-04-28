<template>
	<div
		class="vm-clip"
		:style="styleObject"
	></div>
</template>

<script>
export default {
	name: 'vm-clip',

	data () {
		return {
			// 设置样式
			styleObject: {
				backgroundImage: `url(${this.src})`,
				backgroundPosition: `${this.positionX} ${this.positionY}`,
				backgroundSize: `${this.scale}`,
				width: `${this.width}`,
				height: `${this.height}`
			},
			// 父元素宽度
			contentWidth: document.body.clientWidth
		}
	},

	props: {
		src: String,	// 图片 url
		positionX: {	// X轴裁切位置（top/right/bottom/left/具体尺寸）
			type: String,
			default: 'center'
		},
		positionY: {	// Y轴裁切位置（top/right/bottom/left/具体尺寸）
			type: String,
			default: 'center'
		},
		scale: String,	// cover/contain/null
		width: String, 	// 裁切框宽度
		height: String,	// 裁切框高度
	},

	watch: {
		src: function(val) {
			this.styleObject.backgroundImage = `url(${this.src})`
			this.size()
		}
	},

	mounted () {
		this.size()
	},

	methods: {
		// 设置裁切框尺寸
		size () {
			this.contentWidth = this.$el.parentNode.clientWidth

			let img = new Image()
			img.src = this.src

			img.onload = () => {
				if (!this.width)
					this.styleObject.width = `${img.width > this.contentWidth ? '100%' : img.width + 'px'}`
				if (!this.height) {
					this.styleObject.height = `${this.styleObject.width == '100%' ? img.height/img.width*this.contentWidth : img.height}px`

					// 显示原图
					if (this.styleObject.width == '100%') {
						this.styleObject.backgroundSize = 'cover'
					}
				}
			}
		}
	}
}
</script>

<style lang="less">
.vm-clip {
	display: inline-block;
	background-repeat: no-repeat;
	max-width: 100%;
}
</style>
