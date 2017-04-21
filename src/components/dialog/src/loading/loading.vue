<template>
    <div class="vm-mask-white-dialog">
        <div class="vm-loading">
            <div class="vm-loading-icon"></div>
            <div class="vm-loading-txt" v-html="title" v-if="title"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>
