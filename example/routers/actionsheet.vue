<template>
    <vm-layout title="ActionSheet">

        <vm-button-group>
            <vm-button @click.native="show1 = true" size="large">带取消</vm-button>
            <vm-button @click.native="show2 = true" size="large" type="warning">不带取消</vm-button>
        </vm-button-group>

        <vm-actionsheet :items="myItems1" v-model="show1" cancel="取消"></vm-actionsheet>

        <vm-actionsheet :items="myItems2" v-model="show2"></vm-actionsheet>

    </vm-layout>
</template>

<script>
export default {
    data() {
        return {
            show1: false,
            show2: false,
            myItems1: [
                {
                    label: '拍照',
                    method: () => {
                        this.$dialog.toast({mes: '咔擦，此人太帅！'});
                        //注意： method: function() {} 和 method() {}  这样是无法正常使用当前this的
                    }
                },
                {
                    label: '从相册中偷取',
                    method: () => {
                        this.$dialog.toast({mes: '看到了不该看到的东西！'});
                    }
                }
            ],
            myItems2: [
                {
                    label: '示例菜单一 - 我是不会关闭的',
                    method: () => {
                        this.$dialog.toast({mes: 'Say: 我是不会关闭的！'});
                    },
                    stay: true // 不关闭
                },
                {
                    label: '示例菜单二 - 自动关闭',
                    method: () => {
                        this.$dialog.toast({mes: 'Say: 我关闭啦啦啦！'});
                    }
                },
                {label: '示例菜单三 - 自动关闭'},
                {label: '示例菜单四 - 自动关闭'}
            ]
        }
    }
}
</script>
