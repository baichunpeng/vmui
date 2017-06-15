<template>
    <div class="vm-infiniteScroll">
        <slot name="list"></slot>
        <div ref="tag"></div>

        <div class="vm-infiniteScroll-donetip" v-show="!isLoading && isDone">
            <slot name="doneTip">没有更多数据了</slot>
        </div>

        <div class="vm-infiniteScroll-loading" v-show="isLoading">
            <slot name="loadingTip">加载中...</slot>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {getScrollview} from '../../../utils/assist'

window.$vm = window.$vm || new Vue()

export default {
    name: 'vm-infinitescroll',

    data() {
        return {
            isLoading: false,   // 正在加载状态
            isDone: false       // 是否加载完毕
        }
    },

    props: {
        onInfinite: {   // 列表滚动到一定位置，调用获取下一页数据的方法
            type: Function,
            required: true
        }
    },

    mounted() {
        // 等待 DOM 更新后执行
        this.$nextTick(this.init)
    },

    activated() {
        // 等待 DOM 更新后执行
        this.$nextTick(this.init)
    },

    methods: {
        init() {
            // 获取滚动区
            this.scrollview = getScrollview(this.$el)

            // 事件监听：滚动
            this.scrollview.addEventListener('scroll', this.scrollListener)

            // 事件监听：单次数据加载完毕
            window.$vm.$on('vmui.infinitescroll.loadedOnce', () => {
                this.isLoading = false
            })

            // 事件监听：全部数据加载完毕
            window.$vm.$on('vmui.infinitescroll.loadedAll', () => {
                this.isLoading = false
                this.isDone = true
            })
        },

        // 滚动事件回调
        scrollHandler() {
            if (this.isLoading || this.isDone) return

            const scrollview = this.scrollview
            // 滚动区域高度
            const contentHeight = scrollview == window ? document.body.offsetHeight : scrollview.offsetHeight
            // 滚动区顶部距离页面顶部距离
            const offsetTop = scrollview == window ? 0 : scrollview.getBoundingClientRect().top

            if (this.$refs.tag.getBoundingClientRect().top <= offsetTop + contentHeight + contentHeight / 10) {
                this.isLoading = true
                this.onInfinite()
            }
        },

        // 事件缓冲：延迟 100ms
        throttle(method, context) {
            clearTimeout(method.tId)
            method.tId = setTimeout(() => {
                method.call(context)
            }, 100)
        },

        // 滚动监听函数 延迟后调用 handler
        scrollListener () {
            this.throttle(this.scrollHandler)
        },

        // 销毁
        destroy () {
            this.scrollview.removeEventListener('scroll', this.scrollListener)
        }
    },

    deactivated () {
        this.destroy()
    }
}
</script>

<style lang="less">
.vm-infiniteScroll-loading {
    margin-top: .25rem;
    text-align: center;
    font-size: .65rem;
    color: #999;
    height: 1.65rem;
    line-height: 1.65rem;
    img {
        height: inherit;
        display: inline-block;
    }
}

.vm-infiniteScroll-donetip {
    font-size: .6rem;
    text-align: center;
    padding: .625rem 0;
    color: #777;
}
</style>
