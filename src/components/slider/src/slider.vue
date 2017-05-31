<template>
    <div
        class="vm-slider"
        ref="slider"
    >
        <!-- slider lists -->
        <div
            class="vm-slider-wrapper"
            ref="warpper"
            :class="['vm-slider-wrapper', {'vm-slider-wrapper-vertical': direction == 'vertical'}]"
            :style="dragStyleObject"
        >
            <div class="vm-slider-item" :style="itemHeight" v-html="lastItem"></div>
            <slot></slot>
            <div class="vm-slider-item" :style="itemHeight" v-html="firtstItem"></div>
        </div>
        <!-- pagination -->
        <div
            :class="['vm-slider-pagination', {'vm-slider-pagination-vertical': direction == 'vertical'}]">
            <span
                v-for="(t, i) in itemNums"
                :class="['vm-slider-pagination-item', {'vm-slider-pagination-item-active': paginationIndex == i}]"
            ></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vm-slider',

    data() {
        return {
            firtstItem: '',     // 第一个
            lastItem: '',       // 最后一个
            itemNums: 0,        // list length
            index: 1,           // 当前索引
            itemsArr: [],       // list 数组
            autoPlayTimer: null,// 自动切换事件
            paginationIndex: 0, // 状态圆圈索引
            itemHeight: {       // 高度
                height: null
            },
            dragStyleObject: {  // 动画
                transform: 0,
                speed: 0
            },
            touches: {          // 触摸
                moveTag: 0,
                moveOffset: 0,
                touchStartTime: 0,
                isTouchEvent: false,
                allowClick: false
            }
        }
    },

    props: {
        ready: {        // 是否初始化
            type: Boolean,
            default: true
        },
        speed: {        // 切换速度s
            default: 300,
            validator(val) {
                return /^\d*$/.test(val)
            }
        },
        autoplay: {     // 自动切换时间间隔s
            default: 0,
            validator(val) {
                return /^\d*$/.test(val);
            }
        },
        direction: {    // 滚动方向
            validator(val) {
                return ['horizontal', 'vertical'].indexOf(val) > -1
            },
            default: 'horizontal'
        },
        initIndex: {  // 初始索引值
            default: 0,
            validator(val) {
                return /^\d*$/.test(val)
            }
        }
    },

    watch: {
        ready(val) {
            val && setTimeout(this.init, 0)
        },

        index() {
            const index = this.index
            const itemNums = this.itemNums
            const tm = (index - 1) % itemNums
            this.paginationIndex = tm < 0 ? itemNums - 1 : tm
        },

        initIndex () {
            this.index = parseInt(this.initIndex) + 1
            this.init()
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        // 初始化
        init() {
            if (!this.ready) return;

            this.destroy();

            this.isVertical = this.direction == 'vertical';

            this.itemsArr = this.$children.filter(item => item.$options.name === 'vm-slider-item');

            this.itemNums = this.itemsArr.length;

            if (this.isVertical) {
                this.$refs.slider.style.height = '100%';
                const height = this.$el.clientHeight;
                this.itemHeight.height = height + 'px';
                this.setTranslate(0, -height * this.index);
                this.itemsArr.forEach((item) => {
                    item.$el.style.height = height + 'px';
                });
            } else {
                this.setTranslate(0, -this.$refs.warpper.offsetWidth * this.index);
            }

            this.cloneItem();
            this.bindEvents();
            this.autoPlay();
        },

        // 拷贝
        cloneItem() {
            const itemArr = this.itemsArr;
            this.firtstItem = itemArr[0].$el.innerHTML;
            this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML;
        },

        // 事件处理程序：touchstart
        touchStartHandler(event) {
            const touches = this.touches;
            touches.allowClick = true;
            touches.isTouchEvent = event.type === 'touchstart';
            if (!touches.isTouchEvent && 'which' in event && event.which === 3) return;
            if (touches.moveTag == 0) {
                touches.moveTag = 1;
                touches.startX = event.touches ? event.touches[0].clientX : event.clientX;
                touches.startY = event.touches ? event.touches[0].clientY : event.clientY;
                touches.touchStartTime = Date.now();
                const itemNums = this.itemNums;
                if (this.index == 0) {
                    this.index = itemNums;
                    this.setTranslate(0, -itemNums * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                    return;
                }
                if (this.index > itemNums) {
                    this.index = 1;
                    this.setTranslate(0, this.isVertical ? -this.$el.clientHeight : -this.$refs.warpper.offsetWidth);
                }
            }
        },

        // 事件处理程序：touchmove
        touchMoveHandler(event) {
            if(!this.supportTouch || this.isVertical) {
                event.preventDefault();
            }
            const touches = this.touches;
            touches.allowClick = false;
            if (touches.isTouchEvent && event.type === 'mousemove') return;
            const currentY = event.touches ? event.touches[0].clientY : event.clientY;
            const currentX = event.touches ? event.touches[0].clientX : event.clientX;
            const touchAngle = Math.atan2(Math.abs(currentY - touches.startY), Math.abs(currentX - touches.startX)) * 180 / Math.PI;
            if ((!this.isVertical ? touchAngle > 45 : (90 - touchAngle > 45)) && this.supportTouch) {
                touches.moveTag = 3;
                this.stopAutoplay();
                this.setTranslate(0, -this.index * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                return;
            }
            const deltaSlide = touches.moveOffset = this.isVertical ? (currentY - touches.startY) : (currentX - touches.startX);
            if (deltaSlide != 0 && touches.moveTag != 0) {
                if (touches.moveTag == 1) {
                    this.stopAutoplay();
                    touches.moveTag = 2;
                }
                if (touches.moveTag == 2) {
                    this.setTranslate(0, -this.index * (this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth) + deltaSlide);
                }
            }
        },

        // 事件处理程序：touchend
        touchEndHandler() {
            const touches = this.touches;
            const moveOffset = touches.moveOffset;
            const warpperSize = this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;
            setTimeout(() => {
                touches.allowClick = true;
            }, 0);
            if (touches.moveTag == 1) {
                touches.moveTag = 0;
            }
            if (touches.moveTag == 2) {
                touches.moveTag = 0;
                const timeDiff = Date.now() - touches.touchStartTime;
                if (timeDiff > 300 && Math.abs(moveOffset) <= warpperSize * .5) {
                    this.setTranslate(this.speed, -this.index * warpperSize);
                } else {
                    this.setTranslate(this.speed, -((moveOffset > 0 ? --this.index : ++this.index) * warpperSize));
                }
                this.autoPlay();
                return;
            }
            if (touches.moveTag == 3) {
                touches.moveTag = 0;
                this.autoPlay();
            }
        },

        // 自动切换
        autoPlay() {
            if (this.autoplay <= 0) return;
            this.autoPlayTimer = setInterval(() => {
                const size = this.isVertical ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;
                if (this.index > this.itemNums) {
                    this.index = 1;
                    this.setTranslate(0, -size);
                    setTimeout(() => {
                        this.setTranslate(this.speed, -(++this.index * size));
                    }, 100);
                    return;
                }
                this.setTranslate(this.speed, -(++this.index * size));
            }, this.autoplay);
        },

        // 停止自动切换：clearInterval
        stopAutoplay() {
            clearInterval(this.autoPlayTimer);
        },

        // 绑定事件
        bindEvents() {
            const _events = this.touchEvents();
            this.$el.addEventListener(_events.start, this.touchStartHandler);
            this.$el.addEventListener(_events.move, this.touchMoveHandler);
            this.$el.addEventListener(_events.end, this.touchEndHandler);
            this.$el.addEventListener('click', (e) => {
                if (!this.touches.allowClick) {
                    e.preventDefault();
                }
            });
            window.addEventListener('resize', this.resizeSlides);
        },

        // 取消事件绑定
        unbindEvents() {
            const _events = this.touchEvents();
            this.$el.removeEventListener(_events.start, this.touchStartHandler);
            this.$el.removeEventListener(_events.move, this.touchMoveHandler);
            this.$el.removeEventListener(_events.end, this.touchEndHandler);
            window.removeEventListener('resize', this.resizeSlides);
        },

        // 触摸事件
        touchEvents() {
            const supportTouch = this.supportTouch = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                    })();
            return {
                start: supportTouch ? 'touchstart' : 'mousedown',
                move: supportTouch ? 'touchmove' : 'mousemove',
                end: supportTouch ? 'touchend' : 'mouseup'
            };
        },

        // 动画
        setTranslate(speed, translate) {
            this.dragStyleObject.transitionDuration = speed + 'ms';
            if (this.isVertical) {
                this.dragStyleObject.transform = 'translate3d(0, ' + translate + 'px, 0)';
            } else {
                this.dragStyleObject.transform = 'translate3d(' + translate + 'px, 0, 0)';
            }
        },

        // 根据方向计算尺寸和动画
        resizeSlides() {
            if (this.isVertical) {
                const height = this.$el.clientHeight;
                this.dragStyleObject.transform = 'translate3d(0, ' + -this.index * height + 'px, 0)';
            } else {
                const width = this.$refs.warpper.offsetWidth;
                this.dragStyleObject.transform = 'translate3d(' + -this.index * width + 'px, 0, 0)';
            }
        },

        // 销毁
        destroy() {
            this.unbindEvents();
            this.stopAutoplay();
        }
    },

    destroyed() {
        this.destroy()
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";

.vm-slider {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.vm-slider-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    z-index: 1;
    transition-property: transform;
    &.vm-slider-wrapper-vertical {
        flex-direction: column;
    }
}

.vm-slider-item {
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    a {
        display: block;
    }
    img {
        width: 100%;
    }
}

@keyframes vm-slider-pagination-opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.vm-slider-pagination {
    position: absolute;
    width: 100%;
    z-index: 2;
    left: 0;
    bottom: .1rem*@suiremscale;
    pointer-events: none;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    opacity: 0;
    animation: vm-slider-pagination-opacity .3s linear .4s forwards;
    &.vm-slider-pagination-vertical {
        width: 0;
        height: 100%;
        flex-direction: column;
        bottom: 0;
        left: auto;
        right: .1rem*@suiremscale;
        justify-content: center;
    }
    > .vm-slider-pagination-item {
        margin: .05rem*@suiremscale;
        width: 6px;
        height: 6px;
        display: inline-block;
        border-radius: 100%;
        background-color: #B7D0E1;
        &.vm-slider-pagination-item-active {
            background-color: #FF0005;
        }
    }
}
</style>
