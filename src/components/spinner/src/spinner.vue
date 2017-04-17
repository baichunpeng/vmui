<template>
    <span class="vm-spinner">
        <a href="javascript:;" ref="minus"></a>
        <input
            type="text"
            ref="numInput"
            :readonly="readonly"
            v-model="counter"
        />
        <a href="javascript:;" ref="add"></a>
    </span>
</template>

<script>
export default {
    name: 'vm-spinner',

    data() {
        return {
            counter: 0,
            tapParams: {
                timer: null,
                tapStartTime: 0
            },
            parms: {
                max: 0,
                min: -1
            }
        }
    },

    props: {
        unit: { // 加减间隔
            default: 1,
            validator(val) {
                return /^([1-9]\d*)$/.test(val);
            }
        },
        max: {  // 限制最大值
            default: 0,
            validator(val) {
                return /^(([1-9]\d*)|0)$/.test(val);
            }
        },
        min: {  // 限制最小值
            default: -1,
            validator(val) {
                return /^((-?([1-9]\d*))|0)$/.test(val);
            }
        },
        longpress: {    // 是否长按快速加减
            type: Boolean,
            default: true
        },
        readonly: { // 禁止修改
            type: Boolean,
            default: false
        },
        value: {
            validator(val) {
                return /^(([1-9]\d*)|0)$/.test(val);
            }
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            if (!this.checkParameters())return;

            this.setDefalutValue();

            this.bindEvents();
        },

        checkParameters() {
            const max = ~~this.max;
            const unit = ~~this.unit;
            const min = ~~this.min;

            if (max < unit && max != 0) {
                console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than or equal to \'unit\'(' + unit + ').');
                return false;
            }

            if (max % unit != 0) {
                console.error('[YDUI warn]: The parameter \'max\'(' + max + ') and \'unit\'(' + unit + ') must be multiple.');
                return false;
            }

            if (min % unit != 0 && min >= 0) {
                console.error('[YDUI warn]: The parameter \'min\'(' + min + ') and \'unit\'(' + unit + ') must be multiple.');
                return false;
            }

            if (max < min && max != 0) {
                console.error('[YDUI warn]: The parameter \'max\'(' + max + ') must be greater than to \'min\'(' + min + ').');
                return false;
            }

            return true;
        },

        setDefalutValue() {
            const unit = ~~this.unit;
            const min = ~~this.min;
            const value = ~~this.value;

            if (~~value > 0) {
                this.setValue(value);
                return;
            }

            if (min < 0) {
                this.setValue(unit);
            } else {
                this.setValue(min);
            }
        },

        calculation(type) {
            const max = ~~this.max;
            const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
            const unit = ~~this.unit;

            if (this.readonly)return;

            let val = this.counter;
            let newval;

            if (type == 'add') {
                newval = val + unit;
                if (max != 0 && newval > max)return;
            } else {
                newval = val - unit;
                if (newval < min)return;
            }

            this.setValue(newval);

            if (this.longpress) {
                this.longpressHandler(type);
            }
        },

        setValue(val) {
            const max = ~~this.max;
            const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
            const unit = ~~this.unit;

            if (!/^(([1-9]\d*)|0)$/.test(val)) val = unit;

            if (val > max && max != 0) val = max;

            if (val % unit > 0) {
                val = val - val % unit + unit;
                if (val > max && max != 0) val -= unit;
            }

            if (val < min) val = min - min % unit;

            this.counter = val;
            this.$emit('input', val);
        },

        longpressHandler(type) {
            const currentDate = new Date().getTime() / 1000;

            let intervalTime = currentDate - this.tapParams.tapStartTime;

            if (intervalTime < 1) intervalTime = 0.5;

            let secondCount = intervalTime * 10;
            if (intervalTime == 30) secondCount = 50;
            if (intervalTime >= 40) secondCount = 100;

            this.tapParams.timer = setTimeout(() => {
                this.calculation(type);
            }, 1000 / secondCount);
        },

        clearTapTimer() {
            clearTimeout(this.tapParams.timer);
        },

        bindEvents() {
            const add = this.$refs.add;
            const minus = this.$refs.minus;
            const events = {
                mousedownEvent: 'touchstart',
                mouseupEvent: 'touchend'
            };

            const isMobile = (window.Modernizr && !!window.Modernizr.touch) || (function () {
                        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
                    })();

            if (!isMobile) {
                events.mousedownEvent = 'mousedown';
                events.mouseupEvent = 'mouseup';
            }

            add.addEventListener(events.mousedownEvent, (e) => {
                if (this.longpress) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.tapParams.tapStartTime = new Date().getTime() / 1000;

                    add.addEventListener(events.mouseupEvent, this.clearTapTimer);
                }

                this.calculation('add');
            });

            minus.addEventListener(events.mousedownEvent, (e) => {
                if (this.longpress) {
                    e.preventDefault();
                    e.stopPropagation();

                    this.tapParams.tapStartTime = new Date().getTime() / 1000;

                    minus.addEventListener(events.mouseupEvent, this.clearTapTimer);
                }

                this.calculation('minus');
            });

            this.$refs.numInput.addEventListener('change', () => {
                this.setValue(this.counter);
            });
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-spinner {
    border: 1px solid #EAE8E8;
    border-radius: 1px;
    display: inline-block;
    overflow: hidden;
    > a {
        float: left;
        width: .6rem*@suiremscale;
        height: .6rem*@suiremscale;
        line-height: .62rem*@suiremscale;
        text-align: center;
        font-weight: bold;
        color: #666;
        letter-spacing: 0;
        .tap-color(#F8F8F8, .95);
        &:after {
            font-family: @iconfont-inlay;
            color: #777;
            font-size: .18rem*@suiremscale;
        }
        &:first-child:after {
            content: '\E60B';
        }
        &:last-child:after {
            content: '\E602'
        }
    }
    > input {
        letter-spacing: 0;
        float: left;
        width: .85rem*@suiremscale;
        height: .6rem*@suiremscale;
        line-height: 2.7;
        text-align: center;
        color: #666;
        border: none;
        font-size: .26rem*@suiremscale;
        background-color: #FFF;
    }
}
</style>
