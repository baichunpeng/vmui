<template>
    <vm-layout title="Share">
        <br>
        <p>
            当前宿主环境：
            {{isWechat ? '微信'
                : isqqBrowser ? 'QQ 浏览器'
                : isucBrowser ? 'UC 浏览器'
                : '浏览器'}}
        </p>
        <br>
        <vm-button @click.native="show1 = true">点我分享</vm-button>

        <vm-share
            v-model="show1"
            title="标题"
            :desc="detail"
            url="http://wap.meiwan.me"
            imgUrl="http://img.beautysite.cn/goods/201509/560500889d7a8.jpg"
            :wxConfig="{url: '/api/weixin/jsapi'}"
        >
        </vm-share>
    </vm-layout>
</template>


<script>
export default {
    name: 'example-share',

    data () {
        return {
            detail: '',
            show1: false,
            isWechat: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,    // 宿主环境是否是微信
            isqqBrowser: navigator.userAgent.indexOf('MQQBrowser/') > -1,   // 宿主环境是否是QQ浏览器
            isucBrowser: navigator.userAgent.indexOf('UCBrowser/') > -1    // 宿主环境是否是UC浏览器
        }
    },

    mounted () {
        console.log(this.detail)

        setTimeout(() => {
            this.detail = '详情详情详情'
        }, 6000)
    }
}
</script>