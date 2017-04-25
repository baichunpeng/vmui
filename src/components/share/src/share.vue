<!--
	分享插件：
		微信分享（分享和禁止分享）
		调用原生分享（UC、QQ浏览器）
		浏览器分享（QQ好友 空间 新浪微博 短信 电子邮件）

	用法：见 example
 -->

<template>
	<div>
		<!-- mask -->
		<div
			class="vm-mask-share"
			v-show="show"
			@click.stop="close"
		></div>

		<!-- popup: wechat share -->
		<img
			src="./wechatPopup.png" alt=""
			class="vm-content-share-Wechat"
			v-show="show && isWechat"
			@click.stop="close"
		>

		<!-- popup: broswer share -->
		<div
			:class="['vm-content-share-browser', {'vm-content-share-active': show && !isWechat && !isqqBrowser && !isucBrowser}]"
		>
			<a
				v-for="(item, index) in broswerShareItems"
			 	:href="item.url" target="_blank">
				<img :src="item.icon" alt="">
				<span>{{item.title}}</span>
			</a>
		</div>
	</div>
</template>

<script>
import {addClass, removeClass, getScrollview} from '../../../utils/assist';
import U from '../../utils'
import wechatConfig from './wechatConfig'
import qqucNativeShare from './qqucNativeShare'

export default {
	name: 'vm-share',

	data () {
		return {
			isWechat: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,	// 宿主环境是否是微信
			isqqBrowser: navigator.userAgent.indexOf('MQQBrowser/') > -1,	// 宿主环境是否是QQ浏览器
			isucBrowser: navigator.userAgent.indexOf('UCBrowser/') > -1,	// 宿主环境是否是UC浏览器
			show: false,	// 弹窗显隐
		}
	},

	props: {
		ready: {			// 是否准备就绪
            type: Boolean,
            default: true
        },
		title: String,    	// 分享标题
		desc: {				// 分享内容
			type: String,
			default: ''
		},
		url: {				// 链接地址
            type: String,
            default: location.href
        },
		imgUrl: String,   	// 图片地址
		success: Function,	// 分享成功的回调
		cancel: Function, 	// 取消分享的回调
		wxConfig: Object,	// 请求微信签名的接口和 data
		value: {			// v-model
            type: Boolean,
            default: false
        }
	},

	watch: {
        value(val) {
            val && this.isIOS && addClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');

            this.show = val;
        },
        ready(val) {
            val && setTimeout(this.init, 0);
        }
    },

	computed: {
		// 浏览器分享选项配置
	    broswerShareItems: function () {
	    	return [{
				title: 'QQ',
				icon: require('./icon-qq.png'),
				url: 'http://connect.qq.com/widget/shareqq/index.html?title=' + this.title + '&url=' + this.url + '&summary=' + this.desc + '&desc=' + this.title + '&pics=' + this.imgUrl,
			}, {
				title: 'QQ空间',
				icon: require('./icon-qzone.png'),
				url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + this.title + '&url=' + this.url + '&summary=' + this.desc + '&desc=' + this.title + '&pics=' + this.imgUrl,
			}, {
				title: '新浪微博',
				icon: require('./icon-sina.png'),
				url: 'http://service.weibo.com/share/share.php?url=' + this.url + '&appkey=&language=zh_cn&title=' + this.title + '&source=&sourceUrl=&message=&uids=&pic=' + this.imgUrl + '&searchPic=true&content=',
			}, {
				title: '短信',
				icon: require('./icon-sms.png'),
				url: 'sms:;?body=' + this.title + (this.desc ? '%0A' + this.desc : '') + (this.url ? '%0A猛戳' + this.url + '前往' : ''),
			}, {
				title: '电子邮件',
				icon: require('./icon-mail.png'),
				url: 'mailto:?cc=&bcc=&subject=' + this.title + '&body=' + this.desc + (this.url ? '<br>猛戳' + this.url + '前往' : '') + (this.imgUrl ? '<br><img src=' + this.imgUrl + '' : ''),
			}]
	    }
	},

	mounted() {
        this.init()
    },

	methods: {
		// 初始化
        init() {
            if (!this.ready) return

            if (this.isWechat) this.wxShare()
            if (this.isqqBrowser || this.isucBrowser) this.nativeShare()

            // fix ios scroll bug
            this.scrollView = getScrollview(this.$el)
            this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

        },

		// 微信分享
		wxShare () {
			// 非微信返回
			if (!this.isWechat) return

			// 配置微信接口回调
			wechatConfig(this.wxConfig, wx => {
				let wxdataTimeline = {
					title: this.title,
					link: this.url,
					imgUrl: this.imgUrl,
					success: () => {
						if (this.success) {
							typeof this.success == 'function' && this.success()
							typeof this.success == 'string' &&  eval(this.success)
						}
						this.show = false
					},
					cancel: () => {
						if (this.cancel) {
							typeof this.cancel == 'function' && this.cancel()
							typeof this.cancel == 'string' &&  eval(this.cancel)
						}
						this.show = false
					}
				}

				let wxdata = {desc: this.desc}
				U.extend(wxdata, wxdataTimeline)

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

		// 调用原生分享（UC、QQ浏览器）
		nativeShare () {
			var config = {
                'url': decodeURIComponent(this.url),
                'title': decodeURIComponent(this.title),
                'desc': decodeURIComponent(this.desc),
                'img': decodeURIComponent(this.img),
                'img_title': decodeURIComponent(this.title),
                'from': decodeURIComponent(this.title)
            };

            new qqucNativeShare('nativeShare',config);
		},

		// 关闭
        close() {
            this.isIOS && removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug')

            this.$emit('input', false)
            this.show = false
        },

        destroyed() {
	        this.close()
	    }
	}
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

// mask
.vm-mask-share {
    .mask(rgba(0, 0, 0, .4), @base-zindex * 500);
}

// broswer popup
.vm-content-share-browser {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: @base-zindex * 1000;
    transform: translate(0, 100%);
    transition: transform .3s;
    &.vm-content-share-active {
        transform: translate(0, 0);
    }
	display: flex;
	display: -webkit-flex;
	a {
		width: 20%;
		height: 0;
		padding-bottom: 20%;
		text-align: center;
		font-size: 12px;
		color: #6d6d6d;
		img {
			width: 40%;
			margin: 10px auto 0;
		}
	}
}

// wechat popup
.vm-content-share-Wechat {
	z-index: 600;
	position: fixed;
	width: 70%;
	top: 10px;
	right: 10px;
}
</style>