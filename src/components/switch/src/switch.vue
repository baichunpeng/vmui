<template>
    <input type="checkbox" class="vm-switch" v-model="checked"/>
</template>

<script type="text/babel">
    /**
     * 不兼容鸟包火狐
     */
    export default {
        name: 'vm-switch',
        data() {
            return {
                checked: false
            }
        },
        props: {
            value: Boolean
        },
        watch: {
            checked(val) {
                this.$emit('input', val);
            }
        },
        mounted() {
            this.checked = this.value;
        }
    }
</script>

<style lang="less">
.vm-switch {
    position: relative;
    display: block;
    width: 52px;
    height: 32px;
    left: 0;
    border: 1px solid #DFDFDF;
    border-radius: 16px;
    background-color: #DFDFDF;
    &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        border-radius: 15px;
        transition: transform .3s;
    }
    &:before {
        width: 50px;
        background-color: #FDFDFD;
    }
    &:after {
        width: 30px;
        background-color: #FFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    }
    &:checked {
        border-color: #4CD864;
        background-color: #4CD864;
        &:before {
            transform: scale(0);
        }
        &:after {
            transform: translateX(20px);
        }
    }
}
</style>
