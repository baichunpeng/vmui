<template>
    <div class="vm-notify" :class="classes" v-html="mes"></div>
</template>

<script>
export default {
    data() {
        return {
            classes: ''
        }
    },
    props: {
        mes: String,
        timeout: Number,
        callback: Function
    }
}
</script>
