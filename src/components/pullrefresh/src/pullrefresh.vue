<template>
    <div>
        <div ref="dragBox">
            <slot></slot>
            <div class="vm-pullrefresh-dragtip" ref="dragTip"
                 :class="dragTip.animationTiming"
                 :style="{ 'transform': 'translate3d(0, ' + dragTip.translate + 'px, 0) scale(' + dragTip.scale + ')' }"
            >
                <span :class="dragTip.loadingIcon"
                      :style="{ 'transform': 'rotate(' + dragTip.iconRotate + 'deg)', opacity: dragTip.iconOpacity }"
                ></span>
            </div>
        </div>
        <div class="vm-pullrefresh-draghelp" v-if="showHelpTag" @click="showHelpTag = false">
            <div><span>下拉更新</span></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

window.$vm = window.$vm || new Vue();

export default {
    name: 'vm-pullrefresh',

    props: {
        onInfinite: {
            type: Function,
            required: true
        }
    },

    data() {
        return {
            showHelpTag: false, // 显示下拉更新提示
            dragTip: {  // 正在更新提示
                iconOpacity: 0.5,
                iconRotate: 0,
                loadingIcon: '',
                animationTiming: '',
                scale: 1,
                translate: 0,
                distance: 100
            },
            touches: {
                loading: false,
                startClientY: 0,
                moveOffset: 0,
                isDraging: false
            }
        }
    },

    mounted() {
        this.$nextTick(this.init);
    },

    methods: {
        init() {
            this.offsetTop = this.$refs.dragBox.getBoundingClientRect().top;

            this.bindEvents();

            window.$vm.$on('ydui.pullrefresh.finishLoad', this.finishLoad);

            this.showHelp();
        },

        showHelp() {
            const _key = 'vm-PULLREFRESH-TIP';
            const storage = window.localStorage;

            if (storage.getItem(_key) != 1) {
                this.showHelpTag = true;
                setTimeout(() => {
                    this.showHelpTag = false;
                }, 5000);
            }
            storage.setItem(_key, 1);
        },

        bindEvents() {
            const dragBox = this.$refs.dragBox;

            dragBox.addEventListener('touchstart', this.touchStartHandler);
            dragBox.addEventListener('touchmove', this.touchMoveHandler);
            dragBox.addEventListener('touchend', this.touchEndHandler);

            document.body.addEventListener('touchmove', this.stopWeixinDrag);
        },

        unbindEvents() {
            const dragBox = this.$refs.dragBox;

            dragBox.removeEventListener('touchstart', this.touchStartHandler);
            dragBox.removeEventListener('touchmove', this.touchMoveHandler);
            dragBox.removeEventListener('touchend', this.touchEndHandler);

            document.body.removeEventListener('touchmove', this.stopWeixinDrag);
        },

        stopWeixinDrag(event) {
            this.touches.isDraging && event.preventDefault();
        },

        touchStartHandler(event) {
            if (this.touches.loading) {
                event.preventDefault();
                return;
            }

            if (this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                return;
            }

            this.touches.startClientY = event.touches[0].clientY;
        },

        touchMoveHandler(event) {
            const touches = event.touches[0];

            if (this.touches.loading) {
                event.preventDefault();
                return;
            }

            if (this.touches.startClientY > touches.clientY || this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop || this.touches.loading) {
                return;
            }

            this.touches.isDraging = true;

            let deltaSlide = touches.clientY - this.touches.startClientY;

            this.dragTip.iconOpacity = deltaSlide / 100;

            if (deltaSlide >= this.dragTip.distance) {
                deltaSlide = this.dragTip.distance;
            }

            this.dragTip.iconRotate = deltaSlide / 0.25;

            this.touches.moveOffset = this.dragTip.translate = deltaSlide;
        },

        touchEndHandler(event) {
            const touches = this.touches;

            if (touches.loading) {
                event.preventDefault();
                return;
            }

            if (this.$refs.dragBox.getBoundingClientRect().top < this.offsetTop) {
                return;
            }

            this.dragTip.animationTiming = 'vm-pullrefresh-animation-timing';

            if (touches.moveOffset >= this.dragTip.distance) {
                this.dragTip.translate = this.dragTip.distance / 1.5;
                this.dragTip.loadingIcon = 'vm-pullrefresh-loading';
                this.triggerLoad();
                return;
            }

            this.dragTip.translate = 0;
            this.resetParams();
        },

        triggerLoad() {
            this.touches.loading = true;
            this.onInfinite();
        },

        finishLoad() {
            setTimeout(() => {
                this.dragTip.iconRotate = 0;
                this.dragTip.scale = 0;
                this.resetParams();
            }, 200);
        },

        resetParams() {
            setTimeout(() => {
                const touches = this.touches;
                const dragTip = this.dragTip;
                touches.isDraging = false;
                touches.loading = false;
                touches.moveOffset = 0;
                dragTip.animationTiming = '';
                dragTip.iconOpacity = 0.5;
                dragTip.translate = 0;
                dragTip.scale = 1;
                dragTip.loadingIcon = '';
            }, 150);
        }
    },

    destroyed() {
        this.unbindEvents();
    }
}
</script>


<style lang="less">
@import '../../../styles/variables';

@pullrefresh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAABa1BMVEVTfvH///9TfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFAPDq2AAAAeHRSTlMAAAECAwQGBwkLDQ8QERMUFRkiIyYnLS4vMjM1Njc4OTpAQUJDREVGTVJWXmBiZmdoaWpxc3V8f4GCg4SGiIyNj5aXmZqbnJ+go6SlpqmqrK+wub2/wMHCxMXJzM3P0tPU1djd3t/n6Orr7O7w8fP09fb3+Pn6/f5+D/4+AAABqklEQVQ4y43V+T8CQRQA8GklUeQmhESuHBHJUY5EIWeHECGrcpVV++eb2Z3Y2d22eT+9mfm2n880894AQIRpKnDxVCh/sanD+c7/aS8PdDoCOqPfvCRu3c1VKaOOFC+P3LJBlAQ1h3m1uB8UpJRan/FaOX3i39jaj5fw+OeIJ6nzQ1y4crXhGeP43qfk63/UwQnjxDCxS4ufU9DeNzQqLTBAFn1y2vKIBi9WoAivnAZR/tqtJTG1lWFaHNKUmF6i1K0tRWpDWZLRliINoWykjhRo0ztMYqBuQGpHv3FR0TV07q1U9AzSO0BFM5BG6GgO0nU6ikpkhY5y9DQPqY9+W2E6ek7/Z/noj2CM/mCF6xKnouIlHKWiwtW+ZmqjGV8XpmLBLNWUHXm+Ep+VlGHJVkMaYuhLO/WKG4b+GC2yZqJlsCotAxhPhcqaBrJGtKjYW39akAEA6rS3dr/YxCN6CQWTuGkmXBY802gP4bndBiClYKDaiisP0e3NwEGyWG3NqwwgKWzwFbUGn52QnJbms+ExAjWqeIwyHhN5BxRPXLbAc+xNcK5Hdl1+ASkP8ND4fLD1AAAAAElFTkSuQmCC';
@pullrefreshLoading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAABcVBMVEVTfvH///9TfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvFTfvG7eWgbAAAAenRSTlMAAAECAwQGBwkKCw0PEBETFBUZIiMmJy0uLzIzNTY3ODk6QEFCQ0RFRktNUlZeYGJmZ2hpanFzdXyBgoOEhoiMjY+Wl5mam5yfoKOkpqmqrK+wuLm6vb/AwcLExcnMzc/S09TV2N3e3+fo6uvs7vDx8/T19vf4+fr9/naKfqcAAAGISURBVDjLjZVVW0JBEEBXDLC7FbsVuzDAwO7E7sAORDi/3od7/T72Ajrztjvn4c7dmTNKaZHV7t2+eQ5/BI4Xewq1TFKSdmxZ+yIqTvszEqCNx1jjcTAtDpq9RLy4qIpBK27NXPh81TM+OecPmufvNgva8mYk9ly55o2jafYdYMuuo40hAA5qtCrzPCF20vUPKH0BCPbalCXKfOl6WZnXAPcV6q8wUB/AQ7H6H3WGgc9qJUB3AfqVAHUCHNok6DxArRKg9ldgX0nQegCXCB0FwjkidAM4UyL0CliWoY/AmAz9AoZlaEiOPgFueVlLMnRT/rPc8idokD+s/RXwi1CjCeuUuLWP/mjtTneRNjADCcmCJyL+rqgxDDoTkGn7ANOC4U5ZAQhka8oIxFOGYx2ADquI+mJqKz8HwPuv3vI9hsSXU6Kl2WpK88CVZ96k1s+bdzPJuoorf1UcuVybmvAuHH7+qnnEFiv4SDzB3zVL18aQQ7aMroayEu4tY8XdPRMKnPi6Syzt8gMGxsBO8KgZSQAAAABJRU5ErkJggg==';

.vm-pullrefresh-animation-timing {
    transition: transform 150ms;
}

@keyframes backRotateAnimation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

.vm-pullrefresh-dragtip {
    position: absolute;
    top: -46px;
    left: 50%;
    z-index: 996;
    transform: translate3d(0px, 0px, 0px);
    width: 42px;
    height: 42px;
    line-height: 42px;
    margin-left: -21px;
    border-radius: 50%;
    text-align: center;
    background-color: #FFF;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .25);
    > span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        &:after {
            content: '';
            display: block;
            width: 20px;
            height: 20px;
            background: url(@pullrefresh) no-repeat;
            background-size: 20px 20px;
        }
        &.vm-pullrefresh-loading:after {
            background: url(@pullrefreshLoading) no-repeat;
            background-size: 20px 20px;
            animation: backRotateAnimation .4s linear infinite;
        }
    }
}

.vm-pullrefresh-draghelp {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: @base-zindex * 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        width: 2.3rem*@suiremscale;
        height: 2.3rem*@suiremscale;
        background-color: rgba(0, 0, 0, .8);
        &:before {
            content: '\e60d';
            font-family: @iconfont-inlay;
            font-size: .88rem*@suiremscale;
            text-align: center;
            color: #FFF;
            display: block;
            padding-top: .36rem*@suiremscale;
        }
        > span {
            text-align: center;
            color: #FFF;
            font-size: .28rem*@suiremscale;
            display: block;
            padding-top: .2rem*@suiremscale;
        }
    }
}
</style>
