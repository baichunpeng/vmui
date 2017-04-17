<template>
    <div class="vm-tab">
        <ul class="vm-tab-nav">
            <li class="vm-tab-nav-item"
                v-for="item in navList"
                :class="item._uid == activeIndex ? 'vm-tab-active' : ''"
                @click="changeHandler(item._uid, item.label)">
                <a href="javascript:;">{{item.label}}</a>
            </li>
        </ul>
        <div class="vm-tab-panel">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vm-tab',

    data() {
        return {
            navList: [],
            activeIndex: 0
        }
    },

    props: {
        change: Function
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            const tabPanels = this.$children.filter(item => item.$options.name === 'vm-tab-panel');

            let num = 0;

            tabPanels.forEach((panel) => {
                this.navList.push({
                    label: panel.label,
                    _uid: panel._uid
                });
                if (panel.active) {
                    this.activeIndex = panel._uid;
                } else {
                    ++num;
                    if (num >= tabPanels.length) this.activeIndex = tabPanels[0]._uid;
                }
            });
        },

        changeHandler(uid, label) {
            typeof this.change == 'function' && this.change(label);
            this.activeIndex = uid;
        }
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-tab-nav {
    display: flex;
    position: relative;
    z-index: 0;
    &:after {
        .bottom-line(@tab-bottom-border-color, 3);
    }
}

.vm-tab-nav-item {
    width: 1%;
    flex: 1;
    position: relative;
    text-align: center;
    color: @tab-color;
    font-size: @tab-fontsize;
    line-height: @tab-height;
    display: block;
    &.vm-tab-active {
        .tap-color(@tab-bg, 1);
    }
    .tap-color(@tab-bg, .97);
    a {
        display: inherit;
        color: inherit;
    }
    &:not(:last-child):after {
        position: absolute;
        top: 35%;
        right: 0;
        content: '';
        width: 1px;
        height: 30%;
        transform: scaleX(.5);
        border-right: 1px solid @tab-break-color;
    }
    &.vm-tab-active {
        color: @tab-active-color;
        &:before {
            content: '';
            width: 70%;
            height: 2px;
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -35%;
            z-index: 4;
            background-color: currentColor;
        }
    }
}

.vm-tab-panel {
    position: relative;
    overflow: hidden;
    background-color: #FFF;
    .vm-tab-panel-item {
        width: 100%;
        position: absolute;
        top: 0;
        padding: @body-padding-vertical;
        transform: translateX(-100%);
        &.vm-tab-active {
            position: relative;
            transition: transform .15s;
            transform: translateX(0);
            & ~ .vm-tab-panel-item {
                transform: translateX(100%);
            }
        }
    }
}
</style>
