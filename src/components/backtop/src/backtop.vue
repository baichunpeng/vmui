<template>
    <div v-show="show" @click.stop="scroll2Top">
        <slot v-if="!!$slots.default"></slot>
        <div v-else class="vm-backtop">
            <img :src="require('./up.png')" alt="">
        </div>
    </div>
</template>

<script type="text/babel">
import {scrollTop, getScrollview} from '../../../utils/assist';
export default {
    name: 'vm-backtop',

    data() {
        return {
            show: false,    // 是否显示
            isIos: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        }
    },

    mounted() {
        this.scrollView = getScrollview(this.$el);
        // 注册dom被添加事件
        this.scrollView.addEventListener('scroll', this.throttledCheck, false);
        this.scrollView.addEventListener('resize', this.scrollHandler, false);
    },

    methods: {
        // 滚动到顶部
        scroll2Top() {
            const top = this.scrollView == window ? document.body.scrollTop : this.scrollView.scrollTop;

            // 修复 android 卡顿
            if (this.isIos) {
                scrollTop(this.scrollView, top, 0);
            } else if (this.scrollView === window) {
                window.scrollTo(0, 0);
            } else {
                this.scrollView.scrollTop = 0;
            }
        },

        // 滚动监听回调
        scrollHandler() {
            let offsetTop = window.pageYOffset;
            let offsetHeight = window.innerHeight;
            if (this.scrollView != window) {
                offsetTop = this.scrollView.scrollTop;
                offsetHeight = this.scrollView.offsetHeight;
            }
            this.show = offsetTop >= offsetHeight / 2;
        },

        // 事件缓冲：延迟 100ms
        throttle(method, context) {
            clearTimeout(method.tId);
            method.tId = setTimeout(() => {
                method.call(context);
            }, 100);
        },

        throttledCheck() {
            this.throttle(this.scrollHandler);
        },

        // 解绑事件监听
        destroy () {
            this.scrollView.removeEventListener('scroll', this.throttledCheck, false);
        	this.scrollView.removeEventListener('resize', this.scrollHandler, false);
        }
    },

    destroyed() {
        this.destroy()
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-backtop {
    width: 2rem;
    height: 2rem;
    position: fixed;
    border-radius: 50%;
    right: 5%;
    bottom: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: @base-zindex * 1500;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>