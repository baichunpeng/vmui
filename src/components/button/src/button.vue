<template>
    <button
        :disabled="disabled"
        :class="classes"
        :style="{backgroundColor: bgcolor, color: color}"
    >
        <slot></slot>
    </button>
</template>

<script>
import {isColor} from '../../../utils/assist';

export default {
    name: 'vm-button',

    props: {
        disabled: Boolean,
        type: {
            validator(value) {
                return ['primary', 'danger', 'warning', 'hollow', 'disabled'].indexOf(value) > -1;
            },
            default: 'primary'
        },
        size: {
            validator(value) {
                return ['small', 'large'].indexOf(value) > -1;
            }
        },
        bgcolor: {
            validator(value) {
                if(!value) return true;
                return isColor(value);
            }
        },
        color: {
            validator(value) {
                if(!value) return true;
                return isColor(value);
            }
        }
    },

    computed: {
        classes() {
            let s = this.size == 'large' ? 'vm-btn-block' : 'vm-btn';
            let b = 'vm-btn-' + this.type;
            if (this.disabled) {
                b = 'vm-btn-disabled';
            }

            if (this.bgcolor) {
                b = '';
            }
            return s + ' ' + b;
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-button {
    padding: 0 @body-padding-vertical;
}

.vm-btn-variant() {
    text-align: center;
    position: relative;
    border: none;
    pointer-events: auto;
}

.vm-btn {
    .vm-btn-variant();
    height: @btn-height;
    font-size: @btn-fontsize;
    display: inline-block;
    padding: 0 .2rem*@suiremscale;
    box-sizing: content-box;
    border-radius: @btn-radius;
}

.vm-btn-block {
    .vm-btn-variant();
    width: 100%;
    display: block;
    font-size: @btn-block-fontsize;
    height: @btn-block-height;
    margin-top: @btn-block-margin-top;
    border-radius: @btn-block-radius;
}

.vm-btn-primary {
    .tap-color(@btn-primary-bg);
    color: @btn-default-color;
}

.vm-btn-danger {
    .tap-color(@btn-danger-bg);
    color: @btn-default-color;
}

.vm-btn-warning {
    .tap-color(@btn-warning-bg);
    color: @btn-default-color;
}

.vm-btn-disabled {
    .tap-color(@btn-disabled-bg);
    color: @btn-disabled-color;
    pointer-events: none;
}

.vm-btn-hollow {
    .tap-color(@btn-hollow-bg, .97);
    color: @btn-hollow-color;
    border: 1px solid @btn-hollow-border-color;
}

.hairline .vm-btn-hollow {
    border: .5px solid @btn-hollow-border-color * 0.95;
}
</style>
