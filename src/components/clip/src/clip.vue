<template>
	<!-- <span class="vm-clip">
		<img src="./down2.png" alt="" :style="[{width: imgSize.width}, {height: imgSize.height}, {clip: rect}]">
	</span>
 --></template>

<script>
export default {
	name: 'vm-clip',

	data() {
		return {
			imgSize: {	// 图片尺寸
				width: 'auto',
				height: 'auto'
			},
			rect: 'auto'	// 剪切位置
		}
	},

	props: {
		position: String,  // 图片裁切位置（top/right/bottom/left/具体尺寸）
		size: {    // 裁切尺寸
			width: String,
			height: String
		},
		scale: String	// cover/contain/null
	},

	mounted () {
		this.countSize()
		this.countRect()
	},

	methods: {
		// 计算图片尺寸
		countSize () {
			// 全覆盖
			if (this.scale == 'contain') {
				this.imgSize.with = this.size.width
				this.imgSize.height = 'auto'
			}
			// 短边覆盖
			if (this.scale == 'cover') {
				let width = $('.clip img').width()
				let height = $('.clip img').height()
				let imgScale = width/height
				let clipScale = this.size.width/this.size.height
				this.imgSize.with = imgScale > clipScale ? 'auto' : this.size.width
				this.imgSize.height = imgScale > clipScale ? this.size.height : 'auto'
			}
		},

		// 计算rect
		countRect () {
			console.log($('.clip img'))
			// 默认从左上角裁切
			let top = 0, left = 0,
				right = this.size.width,
				bottom = this.size.height
			// 右上角裁切
			if (this.position == 'right') {
				right = $('.clip img').width()
				left = $('.clip img').width() - this.size.width
			}
			// 左下角裁切
			if (this.position == 'bottom') {
				bottom = $('.clip img').height()
				top = $('.clip img').height() - this.size.height
			}

			this.rect = `rect(${top}px ${right}px ${bottom}px ${left}px)`
			console.log(this.rect)
		}
	}
}
</script>

<style lang="less">
.vm-clip {

}
</style>
