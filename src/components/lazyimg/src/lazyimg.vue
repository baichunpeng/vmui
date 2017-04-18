<template>
    <div class="vm-lazyimg" :style="styles()">
        <img :src="defaultSrc" :datasrc="src" :alt="alt">
    </div>
</template>

<script>
// todo
import {getScrollview, checkInview, addClass} from '../../../utils/assist';

export default {
    name: 'vm-lazyimg',

    props: {
        src: {  // img src
            type: String
        },
        defaultSrc: {   // default img src
            type: String,
            default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        },
        // loading: {    // loading img src
        //     type: String,
        //     default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        // },
        error: {    // error img src
            type: String,
            default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        },
        preLoad: {    // proportion of pre-loading height
            type: Number,
            default: 1.3
        },
        alt: String    // img alt
    },

    mounted() {
        // dom 更新后回调
        this.$nextTick(() => {
            this.init();
        });
    },

    methods: {
        init() {
            this.scrollview = getScrollview(this.$el);

            this.scrollHandler();

            this.bindEvent();
        },

        // 改变默认背景
        styles() {
            return {background: `url(${this.defaultSrc}) no-repeat center center / cover`}
        },

        // 滚动事件监听函数
        scrollHandler() {
            if (checkInview(this.scrollview, this.$el, this.preLoad)) {
                var img = new Image();
                img.src = this.$el.firstChild.getAttribute('datasrc');

                // 图片加载成功
                img.onload = () => {
                    if (checkInview(this.scrollview, this.$el, this.preLoad)) {
                        this.$el.firstChild.setAttribute('src', this.$el.firstChild.getAttribute('datasrc'));
                        addClass(this.$el.firstChild, 'vm-lazyLoaded');
                        this.unbindEvent();
                    }
                }
                // 图片加载失败
                img.onerror = () => {
                    this.$el.firstChild.setAttribute('src', this.error);
                    addClass(this.$el.firstChild, 'vm-lazyLoaded');
                }
            }
        },

        // 绑定事件
        bindEvent() {
            this.scrollview.addEventListener('scroll', this.scrollHandler);
            window.addEventListener('resize', this.scrollHandler);
        },

        // 解绑事件监听
        unbindEvent() {
            this.scrollview.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    },

    destoryed() {
        this.unbindEvent();
    }
}
</script>

<style lang="less">
.vm-lazyimg {
    background: #ccc;
    img {
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity .5s;
        &.vm-lazyLoaded {
            opacity: 1;
        }
    }
}
</style>
