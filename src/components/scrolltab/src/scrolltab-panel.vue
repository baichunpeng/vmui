<template>
    <div class="scrolltab-content-item">
        <strong class="vm-scrolltab-content-title">{{label}}</strong>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'vm-scrolltab-panel',
    props: {
        label: String,
        icon: String,
        active: Boolean
    }
}
</script>
