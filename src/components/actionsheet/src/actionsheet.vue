<template>
    <div>
        <!-- mask -->
        <div
            class="vm-mask-actionsheet"
            v-show="show"
            @click.stop="close"
        ></div>

        <!-- lists -->
        <div
            class="vm-actionsheet"
            :class="show ? 'vm-actionsheet-active' : ''"
        >
            <a
                v-for="item in items"
                @click.stop="itemClick(item)"
                href="javascript:;"
                class="vm-actionsheet-item"
            >{{item.label}}</a>
            <a
                v-if="cancel"
                @click.stop="close"
                href="javascript:;"
                class="vm-actionsheet-action"
            >{{cancel}}</a>
        </div>
    </div>
</template>

<script>
import {addClass, removeClass, getScrollview} from '../../../utils/assist';

export default {
    name: 'vm-actionsheet',

    data() {
        return {
            show: false
        }
    },

    props: {
        value: {
            type: Boolean,
            default: false
        },
        items: {
            type: Array,
            require: true
        },
        cancel: String
    },

    watch: {
        value(val) {
            if (this.isIOS) {
                if (val) {
                    addClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');
                } else {
                    removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');
                }
            }

            this.show = val;
        }
    },

    mounted() {
        this.scrollView = getScrollview(this.$el);

        this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },

    methods: {
        itemClick(item) {
            if(item) {
                typeof item.method == 'function' && item.method();
                !item.stay && this.close();
            }
        },
        close() {
            this.isIOS && removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');

            this.$emit('input', false);
        }
    },

    destroyed() {
        this.close();
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-mask-actionsheet {
    .mask(rgba(0, 0, 0, .4), @base-zindex * 500);
}

.vm-actionsheet {
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: @base-zindex * 1000;
    background-color: @actionsheet-bg;
    transform: translate(0, 100%);
    transition: transform .3s;
}

.vm-actionsheet-item {
    display: block;
    position: relative;
    font-size: @actionsheet-item-fontsize;
    color: @actionsheet-item-color;
    height: @actionsheet-item-height;
    line-height: @actionsheet-item-height;
    background-color: @actionsheet-item-bg;
    &:after {
    .bottom-line(@actionsheet-item-border-color, 2);
    }
}

.vm-actionsheet-action {
    display: block;
    margin-top: .15rem*@suiremscale;
    font-size: @actionsheet-action-fontsize;
    color: @actionsheet-action-color;
    height: @actionsheet-action-height;
    line-height: @actionsheet-action-height;
    background-color: @actionsheet-action-bg;
}

.vm-actionsheet-active {
    transform: translate(0, 0);
}
</style>
