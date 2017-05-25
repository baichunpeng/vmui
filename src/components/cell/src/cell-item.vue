<template>
    <label class="vm-cell-item" v-if="type == 'label' || type == 'checkbox' || type == 'radio'">
        <span class="vm-cell-left" v-if="checkLeft">
            <span class="vm-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </span>
        <label class="vm-cell-right" :class="classes">
            <slot name="right"></slot>
            <i v-if="type == 'checkbox'" class="vm-cell-checkbox-icon"></i>
            <i v-if="type == 'radio'" class="vm-cell-radio-icon"></i>
        </label>
    </label>
    <router-link class="vm-cell-item" :to="href" v-else-if="type == 'link'">
        <div class="vm-cell-left" v-if="checkLeft">
            <span class="vm-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="vm-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </router-link>
    <a class="vm-cell-item" :href="href" v-else-if="type == 'a'">
        <div class="vm-cell-left" v-if="checkLeft">
            <span class="vm-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="vm-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </a>
    <div class="vm-cell-item" v-else>
        <div class="vm-cell-left" v-if="checkLeft">
            <span class="vm-cell-icon"><slot name="icon"></slot></span>
            <slot name="left"></slot>
        </div>
        <div class="vm-cell-right" :class="classes">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vm-cell-item',
    props: {
        type: {
            type: String,
            validator (value) {
                return ['link', 'a', 'label', 'div', 'checkbox', 'radio'].indexOf(value) > -1;
            },
            default: 'div'
        },
        arrow: {
            type: Boolean,
            default: false
        },
        href: {
            type: [String, Object]
        }
    },

    computed: {
        checkLeft() {
            return !!this.$slots.left || !!this.$slots.icon;
        },
        classes() {
            return this.arrow ? 'vm-cell-arrow' : '';
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-cell {
    background-color: #FFF;
    position: relative;
    z-index: 5;
    margin-bottom: .35rem*@suiremscale;
    &:after {
        .bottom-line(@line-high-color);
    }
    a.vm-cell-item,
    label.vm-cell-item {
        .tap-color(#FFF, .96);
    }
}

.vm-cell-item {
    display: flex;
    position: relative;
    padding-left: @body-padding-vertical;
    overflow: hidden;
    &:not(:last-child):after {
        margin-left: @body-padding-vertical;
        .bottom-line(@line-color);
    }
}

.vm-cell-left {
    color: @cell-left-color;
    font-size: @cell-left-fontsize;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.vm-cell-right {
    flex: 1;
    width: 100%;
    min-height: @cell-height;
    color: @cell-right-color;
    text-align: right;
    font-size: @cell-right-fontsize;
    padding-right: @body-padding-vertical;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    input[type="datetime-local"],
    input[type="date"],
    input[type="time"] {
        line-height: @cell-height;
    }
    input[type="radio"],
    input[type="checkbox"]:not(.vm-switch) {
        position: absolute;
        left: -9999em;
        & + .vm-cell-radio-icon:after,
        & + .vm-cell-checkbox-icon:after {
            font-family: @iconfont-inlay;
            font-size: .44rem*@suiremscale;
        }
        & + .vm-cell-radio-icon:after {
            content: '\e600';
            color: #4CD864;
            display: none;
        }
        & + .vm-cell-checkbox-icon:after {
            content: '\e604';
            color: #D9D9D9;
        }
        &:checked {
            & + .vm-cell-radio-icon:after {
                display: inline-block;
            }
            & + .vm-cell-checkbox-icon:after {
                color: #4CD864;
                content: '\e601';
            }
        }
    }
    &:active {
        background: none; /* for firefox */
    }
}

.vm-cell-right {
    input[type="text"],
    input[type="number"],
    input[type="password"],
    input[type="datetime-local"],
    input[type="date"],
    input[type="time"] {
        flex: 1;
        height: @cell-height;
        border: none;
        font-size: @cell-input-fontsize;
        background: transparent;
        color: @cell-input-color;
        display: flex;
        justify-content: flex-start;
        text-align: left; /* fuck UC */
    }
    select {
        flex: 1;
        height: @cell-height;
        border: none;
        display: block;
        color: @cell-select-color;
        font-size: @cell-select-fontsize;
        margin-left: -.08rem*@suiremscale; /* 去除select默认缩进 */
    }
}

.vm-cell-icon {
    display: block;
    margin-right: .1rem*@suiremscale;
    img {
        height: 0.4rem*@suiremscale;
    }
}

.vm-cell-arrow {
    &:after {
        margin-left: .05rem*@suiremscale;
        margin-right: -.08rem*@suiremscale;
        display: block;
        font-family: @iconfont-inlay;
        font-size: @cell-arrow-fontsize;
        color: @cell-arrow-color;
        content: '\e608';
    }
}

.vm-cell-title {
    padding: 0 @body-padding-vertical .1rem*@suiremscale;
    font-size: @cell-title-fontsize;
    text-align: left;
    color: @cell-title-color;
    position: relative;
    z-index: 1;
    background-color: @body-bg;
    &:after {
        .bottom-line(@line-color, 3);
    }
}
</style>
