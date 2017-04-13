<template>
	<div class="vm-backop" @click.stop="scrollEvent" v-if="isShow">
	  <img :src="require('./' + (status == 'up' ? 'up' : 'down') + '2.png')" alt="">
	</div>
</template>

<script>
export default {
	name: 'vm-backtop',

	data() {
		return {
			clientHeight: document.body.clientHeight,	// 网页可见区域高度
			scroll: '',	// 顶部滚动距离
			scrollContent: document.body,	// 滚动区域
			status: 'down',	// 箭头朝向
			isShow: false	// 是否显示
		}
	},

	props: {
		content: String,  // 滚动父元素 class or id, 默认 body
	},

	mounted() {
		// 合并滚动区
		if (this.content) this.scrollContent = document.querySelector(this.content)
		// 注册dom被添加事件
		document.addEventListener('DOMSubtreeModified', this.checkShow, false)
		// 注册滚动事件
		this.scrollContent.addEventListener('scroll', this.handleScroll)
	},

	methods: {
		// 检查是否显示组件：滚动区滚动高度 <= 实际高度，不显示
		checkShow () {
			if (this.scrollContent.scrollHeight > this.scrollContent.clientHeight)
				this.isShow = true
		},

		// 滚动监听
		handleScroll() {
			this.scroll = this.scrollContent.scrollTop

			// 切换箭头状态：若滚动区高度 > 1.5倍可视区高度，滚动半屏后切换；否则，滚动>0就切换
			let scale = 0
			if (this.scrollContent.scrollHeight > 1.5 * this.scrollContent.clientHeight) {
				scale = 0.5
			}
			this.status = this.scroll > scale * this.clientHeight ? 'up' : 'down'
		},

		// 滚动事件
		scrollEvent () {
			if(this.status == 'up') this.scroll2Top()
			else this.scroll2Bottom()
		},

		// 滚动到顶部
		scroll2Top () {
			// 滚动间距
			let ispeed = Math.floor(-this.scroll / 10)
			let timer = setInterval(() => {
				this.scrollContent.scrollTop = this.scroll + ispeed
				//到达顶部，清除定时器
			    if (this.scroll <= 0) clearInterval(timer)
			}, 10)
		},

		// 滚动到底部
		scroll2Bottom () {
			// 滚动间距
			let ispeed = Math.floor((this.scrollContent.scrollHeight - this.scrollContent.clientHeight - this.scroll) / 10)
			let timer = setInterval(() => {
				this.scrollContent.scrollTop = this.scroll + ispeed
				//到达底部，清除定时器
			    if (this.scroll + this.scrollContent.clientHeight >= this.scrollContent.scrollHeight) clearInterval(timer)
			}, 10)
		}
	}
}
</script>

<style scoped lang="less">
.vm-backop {
	position: fixed;
	right: 0;
	bottom: 10%;
	width: 1.86rem;
	height: 1.86rem;
	right: 1.4rem;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
