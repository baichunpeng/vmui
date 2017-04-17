<template>
    <router-link :to="link" class="tabbar-item" :class="classes" :style="styles">
        <span class="tabbar-icon">
            <slot name="icon"></slot>
            <span class="tabbar-badge">
                <slot name="badge"></slot>
            </span>
            <span class="tabbar-dot" v-if="dot"></span>
        </span>
        <span class="tabbar-txt">{{title}}</span>
    </router-link>
</template>

<script>
import {isColor} from '../../../utils/assist';

export default {
    name: 'vm-tabbar-item',

    props: {
        link: String,
        title: String,
        active: Boolean,
        dot: Boolean
    },

    computed: {
        classes() {
            return this.active ? 'tabbar-active' : '';
        },

        styles() {
            return {color: this.active ? this.activeColor : this.$parent.color};
        }
    }
}
</script>
