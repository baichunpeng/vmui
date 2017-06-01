<template>
    <footer
        class="vm-tabbar tabbbar-top-line-color"
        :class="classes"
        :style="styles"
    >
        <slot></slot>
    </footer>
</template>

<script>
import {isColor} from '../../../utils/assist';

export default {
    name: 'vm-tabbar',

    props: {
        fixed: Boolean,
        activeColor: {
            validator(value) {
                if (!value) return true;
                return isColor(value);
            },
            default: '#09BB07'
        },
        bgcolor: {
            validator(value) {
                if (!value) return true;
                return isColor(value);
            },
            default: '#FFF'
        },
        color: {
            validator(value) {
                if (!value) return true;
                return isColor(value);
            },
            default: '#979797'
        },
        fontsize: {
            validator(value) {
                return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
            },
            default: '0.6rem'
        }
    },

    computed: {
        classes() {
            return this.fixed ? 'tabbar-fixed' : '';
        },
        styles() {
            return {
                color: this.activeColor,
                backgroundColor: this.bgcolor,
                fontSize: this.fontsize
            }
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-tabbar {
    width: 100%;
    position: relative;
    z-index: @base-zindex * 100;
    display: flex;
    align-items: center;
    padding: .16rem 0 .275rem;
    background-color: @tabbar-bg;
    &:after {
        .top-line(@tabbar-border-color);
    }
}

.tabbar-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 49;
}

.tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tabbar-active {
    color: inherit;
    .tabbar-icon {
        color: inherit;
    }
}

.tabbar-badge {
    position: absolute;
    top: -.02rem*@suiremscale;
    left: 100%;
    z-index: 999;
    margin-left: -.15rem*@suiremscale;
}

.tabbar-dot {
    display: block;
    width: 10px;
    height: 10px;
    background-color: #EF4F4F;
    border-radius: 50%;
    position: absolute;
    top: .02rem*@suiremscale;
    left: 100%;
    z-index: 999;
    margin-left: -.11rem*@suiremscale;
}

.tabbar-icon {
    height: @tabbar-icon-fontsize * 1.08;
    display: flex;
    align-items: center;
    position: relative;
    img {
        height: 70%;
    }
}

.tabbar-txt {
    display: inline-block;
    font-size: inherit;
}
</style>


