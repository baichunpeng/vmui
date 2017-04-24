<!--
	分享插件：
		微信分享（分享和禁止分享）
		调用原生分享（UC、QQ浏览器）
		浏览器分享（QQ好友 空间 新浪微博 短信 电子邮件）
		手机QQ分享（QQ好友 空间 微信好友 朋友圈）

	用法：
		<Share
			title="xx"
			desc="xx"
			url="xx"
			imgUrl="xx"
			success="() => {alert()}"
			cancel="() => {alert()}"
			inline-template
		>
			<button class="share" @click="prop">点击按钮分享</button>
		</Share>
 -->

<template>
	<div
		class="vm-share"
		@click="prop"

	>
		<button
			type="button"
			class="vm-share-button"
			v-html="text"
			v-if="text"
		>分享</button>

		<slot></slot>

		<!-- 浏览器分享 -->
		<div>
			<a :href="'http://connect.qq.com/widget/shareqq/index.html?title=' + title + '&url=' + url + '&summary=' + desc + '&desc=' + title + '&pics=' + imgUrl" target="_blank">QQ</a>
			<a :href="'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + title + '&url=' + url + '&summary=' + desc + '&desc=' + title + '&pics=' + imgUrl" target="_blank">QQ空间</a>
			<a :href="'http://service.weibo.com/share/share.php?url=' + url + '&appkey=&language=zh_cn&title=' + title + '&source=&sourceUrl=&message=&uids=&pic=' + imgUrl+ '&searchPic=true&content='" target="_blank">新浪微博</a>
			<a :href="'sms:;?body=' + title + (desc ? '%0A' + desc : '') + (url ? '%0A猛戳' + url + '前往' : '')" target="_blank">短信</a>
			<a :href="'mailto:?cc=&bcc=&subject=' + title + '&body=' + desc + (url ? '<br>猛戳' + url + '前往' : '') + (imgUrl ? '<br><img src=' + imgUrl + '' : '')" target="_blank">电子邮件</a>
		</div>
	</div>
</template>

<script>
// import ucqqApi from './ucqqapi'
// import WxConfig from './WxConfig'

export default {
	name: 'vm-share',

	props: {
		'text': String,			// 分享 html
		'title': String,    	// 分享标题
		'desc': {
			type: String,
			default: ''
		},     	// 分享内容
		'url': String,      	// 链接地址
		'imgUrl': String,   	// 图片地址
		'success': Function,	// 分享成功的回调
		'cancel': Function 		// 取消分享的回调
	},

	data () {
		return {
			isWeixin: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,
			getAllProps: false  // 获取全部入参
		}
	},

	watch: {
		title: function (val, oldVal) {
			this.checkProps()
		},

		desc: function (val, oldVal) {
			this.checkProps()
		},

		url: function (val, oldVal) {
			this.checkProps()
		},

		imgUrl: function (val, oldVal) {
			this.checkProps()
		}
	},

	methods: {
		// 分享提示弹层
		prop () {
			// 微信
			if (this.isWeixin) {
console.log('微信分享')

				// $.modal && $.modal({
				//     'text': `<img src="${require('./Share-guide.png')}">`,
				//     'extraClass': 'shareModal'
				// })

				// window.weui && weui.dialog({
				//     content: `<img src="${require('./Share-guide.png')}">`,
				//     className: 'shareModal',
				// });
			}
			// UC QQ 浏览器 原生
			else if (false) {
console.log('UC QQ 浏览器 原生')
			}
			// 浏览器网页分享
			else {
console.log('浏览器网页分享')


			}

			// 手机QQ分享
		},

		// 检测参数
		checkProps () {
			// 微信
			if (this.isWeixin) {
				this.getAllProps ||
				this.title &&
				this.desc &&
				this.imgUrl &&
				(this.getAllProps = true) &&
				this.wxShare()
			}
			// UC QQ 浏览器 原生
			else if (false) {

			}
			// 浏览器网页分享
			else {

			}
		},

		// 微信分享
		wxShare () {
			// 非微信返回
			if (!this.isWeixin) return

			// 配置微信接口回调
			WxConfig(wx => {
				let wxdataTimeline = {
					title: this.title,
					link: this.url || location.href,
					imgUrl: this.imgUrl,
					success: () => {
						if (this.success) {
							typeof this.success == 'function' && this.success()
							typeof this.success == 'string' &&  eval(this.success)
						}
						$.closeModal()
					},
					cancel: () => {
						if (this.cancel) {
							typeof this.cancel == 'function' && this.cancel()
							typeof this.cancel == 'string' &&  eval(this.cancel)
						}
						$.closeModal()
					}
				}

				let wxdata = $.extend({
					'desc': this.desc
				}, wxdataTimeline)

				// 显示右上角菜单
				wx.showOptionMenu()
				// 分享给朋友
				wx.onMenuShareAppMessage(wxdata)
				// 分享到朋友圈
				wx.onMenuShareTimeline(wxdataTimeline)
				// 分享到QQ
				wx.onMenuShareQQ(wxdata)
				// 分享到QQ空间
				wx.onMenuShareQZone(wxdata)
				// 分享到微博
				wx.onMenuShareWeibo(wxdata)
			})
		},

		// 浏览器分享（QQ好友 空间 新浪微博 短信 电子邮件）
		broswerShare () {

		},

		// 调用原生分享（UC、QQ浏览器）
		nativeShare () {

		}
	}
}
</script>

<style lang="less">
// .shareModal
//     left: auto
//     right: 0
//     top: 2rem
//     .modal-inner
//         background: transparent
//         img
//             width: 100%
</style>