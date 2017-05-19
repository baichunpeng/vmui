<template>
	<div class="vm-backop" @click.stop="scrollEvent" v-if="isShow">
	  <img :src="require('./' + (status == 'up' ? 'up' : 'down') + '.png')" alt="">
	</div>
</template>

<script>
import {getScrollview} from '../../../utils/assist'

export default {
	name: 'vm-backtop',

	data() {
		return {
			scroll: '',		// 顶部滚动距离
			status: 'down',	// 箭头朝向
			isShow: true	// 是否显示
		}
	},

	mounted() {
		// 等待 DOM 更新后执行
        this.$nextTick(this.init)
	},

	methods: {
		init () {
			// 获取滚动区
            this.scrollview = getScrollview(this.$el)
			// 注册dom被添加事件
			document.addEventListener('DOMSubtreeModified', this.checkShow, false)
			// 注册滚动事件
			this.scrollview.addEventListener('scroll', () => {
                this.throttle(this.scrollHandler)
            })
		},

		// 检查是否显示组件：滚动区滚动高度 <= 实际高度，不显示
		checkShow () {
			this.isShow = this.scrollview.scrollHeight > this.scrollview.clientHeight
		},

		// 滚动监听
		scrollHandler() {
			this.scroll = this.scrollview.scrollTop

			// 切换箭头状态：若滚动区高度 > 1.5倍可视区高度，滚动半屏后切换；否则，滚动 > 0就切换
			let scale = 0
			if (this.scrollview.scrollHeight > 1.5 * this.scrollview.clientHeight) {
				scale = 0.5
			}
			this.status = this.scroll > scale * this.scrollview.clientHeight ? 'up' : 'down'
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
				this.scrollview.scrollTop = this.scroll + ispeed
				//到达顶部，清除定时器
			    if (this.scroll <= 0) clearInterval(timer)
			}, 10)
		},

		// 滚动到底部
		scroll2Bottom () {
			// 滚动间距
			let ispeed = Math.floor((this.scrollview.scrollHeight - this.scrollview.clientHeight - this.scroll) / 10)
			let timer = setInterval(() => {
				this.scrollview.scrollTop = this.scroll + ispeed
				//到达底部，清除定时器
			    if (this.scroll + this.scrollview.clientHeight >= this.scrollview.scrollHeight) clearInterval(timer)
			}, 10)
		},

		// 事件缓冲：延迟 100ms
        throttle(method, context) {
            clearTimeout(method.tId)
            method.tId = setTimeout(() => {
                method.call(context)
            }, 100)
        },

        // 解绑事件监听
        destroy () {
			document.removeEventListener('DOMSubtreeModified', this.checkShow, false)
        	this.scrollview.removeEventListener('scroll', this.scrollHandler)
        }
	},

	destroyed() {
		this.destroy()
    }
}
</script>

<style lang="less">
.vm-backop {
	position: fixed;
	right: 0;
	bottom: 10%;
	width: 2rem;
	height: 2rem;
	right: .75rem;
	z-index: 10000;
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
