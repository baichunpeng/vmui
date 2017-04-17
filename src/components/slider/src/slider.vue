<template>
    <div
        class="vm-slider"
        ref="slider"
    >
        <!-- 滚动lists -->
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
        <!-- 状态圆标 -->
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
            firtstItem: '',
            lastItem: '',
            itemNums: 0,
            index: 1,
            itemsArr: [],
            autoPlayTimer: null,
            paginationIndex: 0,
            itemHeight: {
                height: null
            },
            dragStyleObject: {
                transform: 0,
                speed: 0
            },
            touches: {
                moveTag: 0,
                startClientPosition: 0,
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
                return /^\d*$/.test(val);
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
                return ['horizontal', 'vertical'].indexOf(val) > -1;
            },
            default: 'horizontal'
        }
    },

    watch: {
        index() {
            const index = this.index;
            const itemNums = this.itemNums;
            const tm = (index - 1) % itemNums;
            this.paginationIndex = tm < 0 ? itemNums - 1 : tm;
        },
        ready(val) {
            val && setTimeout(this.init, 0);
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            if (!this.ready)return;

            this.itemsArr = this.$children.filter(item => item.$options.name === 'vm-slider-item');

            this.itemNums = this.itemsArr.length;

            if (this.direction == 'vertical') {
                this.$refs.slider.style.height = '100%';
                const height = this.$el.clientHeight;
                this.itemHeight.height = height + 'px';
                this.setTranslate(0, -height);
                this.itemsArr.forEach((item) => {
                    item.$el.style.height = height + 'px';
                });
            } else {
                this.setTranslate(0, -this.$refs.warpper.offsetWidth);
            }
            this.cloneItem();
            this.bindEvents();

            this.autoplay > 0 && this.autoPlay();
        },

        cloneItem() {
            const itemArr = this.itemsArr;

            this.firtstItem = itemArr[0].$el.innerHTML;
            this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML;
        },

        touchStartHandler(event) {
            const touches = this.touches;

            touches.allowClick = true;

            touches.isTouchEvent = event.type === 'touchstart';

            if (!touches.isTouchEvent && 'which' in event && event.which === 3) return;

            if (touches.moveTag == 0) {
                touches.moveTag = 1;

                if (this.direction == 'vertical') {
                    touches.startClientPosition = event.touches ? event.touches[0].clientY : event.clientY;
                } else {
                    touches.startClientPosition = event.touches ? event.touches[0].clientX : event.clientX;
                }

                touches.touchStartTime = Date.now();

                const itemNums = this.itemNums;

                if (this.index == 0) {
                    this.index = itemNums;
                    this.setTranslate(0, -itemNums * (this.direction == 'vertical' ? this.$el.clientHeight : this.$refs.warpper.offsetWidth));
                    return;
                }

                if (this.index > itemNums) {
                    this.index = 1;
                    this.setTranslate(0, this.direction == 'vertical' ? -this.$el.clientHeight : -this.$refs.warpper.offsetWidth);
                }
            }
        },

        touchMoveHandler(event) {
            event.preventDefault();

            const touches = this.touches;

            touches.allowClick = false;

            if (touches.isTouchEvent && event.type === 'mousemove') return;

            let position = 0;
            if (this.direction == 'vertical') {
                position = event.touches ? event.touches[0].clientY : event.clientY;
            } else {
                position = event.touches ? event.touches[0].clientX : event.clientX;
            }

            const deltaSlide = touches.moveOffset = position - touches.startClientPosition;

            if (deltaSlide != 0 && touches.moveTag != 0) {
                if (touches.moveTag == 1) {
                    this.stopAutoplay();
                    touches.moveTag = 2;
                }
                if (touches.moveTag == 2) {
                    this.setTranslate(0, -this.index * (this.direction == 'vertical' ? this.$el.clientHeight : this.$refs.warpper.offsetWidth) + deltaSlide);
                }
            }
        },

        touchEndHandler() {
            const touches = this.touches;
            const moveOffset = touches.moveOffset;
            const warpperSize = this.direction == 'vertical' ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;

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
            }
        },

        autoPlay() {
            this.autoPlayTimer = setInterval(() => {
                const size = this.direction == 'vertical' ? this.$el.clientHeight : this.$refs.warpper.offsetWidth;

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

        stopAutoplay() {
            clearInterval(this.autoPlayTimer);
        },

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

        unbindEvents() {
            const _events = this.touchEvents();

            this.$el.removeEventListener(_events.start, this.touchStartHandler);
            this.$el.removeEventListener(_events.move, this.touchMoveHandler);
            this.$el.removeEventListener(_events.end, this.touchEndHandler);

            window.removeEventListener('resize', this.resizeSlides);
        },

        touchEvents() {
            const supportTouch = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                    })();

            return {
                start: supportTouch ? 'touchstart' : 'mousedown',
                move: supportTouch ? 'touchmove' : 'mousemove',
                end: supportTouch ? 'touchend' : 'mouseup'
            };
        },

        setTranslate(speed, translate) {
            this.dragStyleObject.transitionDuration = speed + 'ms';
            if (this.direction == 'vertical') {
                this.dragStyleObject.transform = 'translate3d(0, ' + translate + 'px, 0)';
            } else {
                this.dragStyleObject.transform = 'translate3d(' + translate + 'px, 0, 0)';
            }
        },

        resizeSlides() {
            if (this.direction == 'vertical') {
                const height = this.$el.clientHeight;
                this.dragStyleObject.transform = 'translate3d(0, ' + -this.index * height + 'px, 0)';
            } else {
                const width = this.$refs.warpper.offsetWidth;
                this.dragStyleObject.transform = 'translate3d(' + -this.index * width + 'px, 0, 0)';
            }
        }
    },

    destroyed() {
        this.unbindEvents();
        this.stopAutoplay();
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
