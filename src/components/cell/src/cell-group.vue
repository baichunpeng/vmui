<template>
    <div class="vm-cell">
        <div class="vm-cell-title" v-if="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default{
    name: 'vm-cell-group',
    props: {
        title: String
    }
}
</script>
