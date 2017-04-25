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
        <vm-share
            title="标题"
            desc="详情"
            url="http://wap.meiwan.me"
            imgUrl="http://img.beautysite.cn/goods/201509/560500889d7a8.jpg"
        >
            <vm-button>点我分享</vm-button>
        </vm-share>
    </vm-layout>
</template>


<script>
export default {
    name: 'example-share',

    data () {
        return {
            isWechat: navigator.userAgent.toLowerCase().indexOf('micromessenger/') > -1,    // 宿主环境是否是微信
            isqqBrowser: navigator.userAgent.indexOf('MQQBrowser/') > -1,   // 宿主环境是否是QQ浏览器
            isucBrowser: navigator.userAgent.indexOf('UCBrowser/') > -1    // 宿主环境是否是UC浏览器
        }
    }
}
</script>