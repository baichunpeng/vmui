<template>
    <vm-layout title="SendCode">
        <vm-cell-group class="demo-small-pitch">
            <vm-cell-item>
                <i slot="icon" class="demo-icons-phone"></i>
                <input type="text" slot="right" placeholder="请输入手机号码">

                <!-- ↓↓关键代码是这里↓↓ -->
                <yd-sendcode slot="right" v-model="start1" @click.native="sendCode" type="warning"></yd-sendcode>
                <!-- ↑↑关键代码是这里↑↑ -->

            </vm-cell-item>
        </vm-cell-group>

        <vm-button-group>
            <yd-sendcode
                v-model="start2"
                @click.native="sendCode2"
                second="15"
                runStr="在{%s}秒后你就可以重新获取啦"
                resetStr="你可以重新获取验证码啦"
                size="large"
                type="primary"
            ></yd-sendcode>
        </vm-button-group>
    </vm-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                start1: false,
                start2: false
            }
        },
        methods: {
            sendCode() {
                this.$dialog.loading.open('发送中...');
                setTimeout(() => {

                    this.start1 = true;
                    this.$dialog.loading.close();

                    this.$dialog.toast({
                        mes: '已发送',
                        icon: 'success',
                        timeout: 1500
                    });

                }, 1000);
            },
            sendCode2() {
                this.start2 = true;
            }
        }
    }
</script>
