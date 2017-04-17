<template>
    <span class="vm-badge" :class="typesClass" :style="{backgroundColor: bgcolor, color: color}">
        <slot></slot>
    </span>
</template>

<script>
import {isColor} from '../../../utils/assist';

export default {
    name: 'vm-badge',
    props: {
        type: {
            validator(value) {
                return ['primary', 'danger', 'warning', 'hollow'].indexOf(value) > -1;
            }
        },
        shape: {
            validator(value) {
                return ['circle', 'square'].indexOf(value) > -1;
            }
        },
        color: {
            validator(value) {
                if(!value) return true;
                return isColor(value);
            }
        },
        bgcolor: {
            validator(value) {
                if(!value) return true;
                return isColor(value);
            }
        }
    },

    computed: {
        typesClass() {
            if (this.bgcolor) {
                if (this.shape == 'square') {
                    return ' vm-badge-radius';
                }
                return '';
            }
            return (this.type ? 'vm-badge-' + this.type : '') + (this.shape == 'square' ? ' vm-badge-radius' : '');
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";

.vm-badge {
    color: @badge-default-color;
    font-size: 12px;
    position: relative;
    display: inline-block;
    border-radius: 1000px;
    line-height: 1;
    padding: 3px 6px;
    white-space: nowrap;
    background-color: @badge-default-bg;
}

.vm-badge-radius {
    border-radius: 2px;
    &:after {
        border-radius: 2px;
    }
}

.vm-badge-primary {
    background-color: @badge-primary-bg;
    color: #FFF;
}

.vm-badge-danger {
    background-color: @badge-danger-bg;
    color: #FFF;
}

.vm-badge-warning {
    background-color: @badge-warning-bg;
    color: #FFF;
}

.vm-badge-hollow {
    background-color: @badge-hollow-bg;
    color: @badge-hollow-color;
    &:after {
        content: '';
        width: 200%;
        height: 200%;
        border: 1px solid @badge-hollow-color;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 1rem*@suiremscale;
        transform-origin: 0 0;
        transform: scale(.5);
    }
}

.vm-badge-radius:after {
    border-radius: 2px;
}
</style>
