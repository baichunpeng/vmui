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
            default: 'data:image/png;base64,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'
        },
        loading: {    // loading img src
            type: String,
            default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        },
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
        this.$nextTick(() => {
            this.init();
        });
    },

    methods: {
        init() {
            this.scrollview = getScrollview(this.$el);

            this.changeDeaultSrc();

            this.scrollHandler();

            this.bindEvent();
        },

        // 改变默认背景
        styles() {
            return {width: '100%'}
        },


        // 改变默认背景
        changeDeaultSrc () {
            // if (this.defaultsrc)
                // this.$el.style.background = 'url(' + this.defaultsrc + ') no-repeat center center / cover'
        },

        // 是否滚动到可视区
        checkInview () {

        },

        // 滚动事件监听函数
        scrollHandler() {
            if (checkInview(this.scrollview, this.$el)) {
                var img = new Image();
                img.src = this.$el.firstChild.getAttribute('datasrc');
                img.onload = () => {
                    this.$el.firstChild.setAttribute('src', this.$el.firstChild.getAttribute('datasrc'));
                    addClass(this.$el.firstChild, 'vm-lazyLoaded');
                    this.unbindEvent();
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
        opacity: 0;
        transition: opacity .5s;
        &.vm-lazyLoaded {
            opacity: 1;
        }
    }
}
</style>
