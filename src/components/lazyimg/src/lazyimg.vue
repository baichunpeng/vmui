<template>
    <img class="vm-lazyimg" :src="defaultSrc" :datasrc="src" :alt="alt">
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

            this.scrollHandler();

            this.bindEvent();
        },

        scrollHandler() {
            if (checkInview(this.scrollview, this.$el)) {
                this.$el.setAttribute('src', this.$el.getAttribute('datasrc'));
                addClass(this.$el, 'vm-loaded');
                this.unbindEvent();
            }
        },

        bindEvent() {
            this.scrollview.addEventListener('scroll', this.scrollHandler);
            window.addEventListener('resize', this.scrollHandler);
        },

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
    width: 100%;
    opacity: 0;
    transition: opacity .5s;
    &.vm-loaded {
        opacity: 1;
    }
}
</style>
