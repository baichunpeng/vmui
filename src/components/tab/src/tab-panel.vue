<template>
    <div class="vm-tab-panel-item" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'vm-tab-panel',

    props: {
        label: String,
        active: Boolean
    },

    computed: {
        classes() {
            return this.$parent.activeIndex == this._uid ? 'vm-tab-active' : '';
        }
    }
}
</script>
