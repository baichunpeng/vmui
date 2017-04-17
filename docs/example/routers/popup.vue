<template>
    <vm-layout title="Popup">

        <vm-button-group>
            <vm-button size="large" type="primary" @click.native="show1 = true">中间弹出</vm-button>
            <vm-button size="large" type="warning" @click.native="show2 = true">下部弹出</vm-button>
            <vm-button size="large" type="danger" @click.native="show3 = true">左侧弹出</vm-button>
            <vm-button size="large" type="danger" @click.native="show4 = true">右侧弹出</vm-button>
        </vm-button-group>

        <vm-popup v-model="show1" position="center" width="90%">
            <p>
                呐~你也看到了，我只是一个普通弹窗，样式神马的请自己加吧~
            </p>
            <p style="text-align: right;">
                <vm-button @click.native="show1 = false">Close Center Popup</vm-button>
            </p>
        </vm-popup>

        <vm-popup v-model="show2" position="bottom" height="60%">
            <vm-button type="warning" style="margin: 30px;" @click.native="show2 = false">Close Bottom Popup</vm-button>
        </vm-popup>

        <vm-popup v-model="show3" position="left" width="60%">
            <vm-button type="danger" style="margin: 30px;" @click.native="show3 = false">Close Left Popup</vm-button>
        </vm-popup>

        <vm-popup v-model="show4" position="right">
            <vm-button type="danger" style="margin: 30px;" @click.native="show4 = false">Close Right Popup</vm-button>
        </vm-popup>

    </vm-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                show1: false,
                show2: false,
                show3: false,
                show4: false
            }
        }
    }
</script>
