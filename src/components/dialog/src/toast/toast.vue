<template>
    <div class="vm-mask-white-dialog">
        <div class="vm-toast" :class="iconsClass == '' ? 'vm-toast-none-icon' : ''">
            <div v-if="iconsClass" :class="iconsClass"></div>
            <p class="vm-toast-content" v-html="mes"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mes: String,
        icon: String,
        timeout: Number,
        callback: Function
    },
    computed: {
        iconsClass() {
            let _icon = '';
            if (this.icon == 'success' || this.icon == 'error') {
                _icon = 'vm-toast-' + this.icon + '-icon';
            }
            return _icon;
        }
    }
}
</script>
