<template>
    <vm-layout>
        <vm-navbar title="NavBar1" class="demo-small-pitch"></vm-navbar>

        <vm-navbar slot="navbar" title="NavBar">
            <router-link to="/" slot="left">
                <vm-navbar-back-icon></vm-navbar-back-icon>
            </router-link>
        </vm-navbar>

        <vm-navbar title="NavBar2" class="demo-small-pitch">
            <router-link to="/" slot="left">
                <vm-navbar-back-icon></vm-navbar-back-icon>
            </router-link>

            <router-link to="/" slot="right">
                <vm-navbar-next-icon></vm-navbar-next-icon>
            </router-link>
        </vm-navbar>

        <vm-navbar class="demo-small-pitch">
            <router-link to="/" slot="left">
                <vm-navbar-back-icon>返回</vm-navbar-back-icon>
            </router-link>

            <img slot="center" src="http://static.ydcss.com/www/img/logo.png" alt="">

            <router-link to="/tabbar" slot="right">
                <vm-navbar-next-icon>前进</vm-navbar-next-icon>
            </router-link>
        </vm-navbar>

        <vm-navbar title="长标题原来长这样的啊" class="demo-small-pitch">
            <vm-button type="danger" slot="left" @click.native="toastNone">
                点我点我!
            </vm-button>
            <router-link to="/" slot="right">
                <i class="demo-icons-discover"></i>
            </router-link>
            <router-link to="/" slot="right">
                <i class="demo-icons-me"></i>
            </router-link>
        </vm-navbar>

    </vm-layout>
</template>

<script>
export default {
    name: 'example-navbar',

    methods: {
        toastNone () {
            this.$dialog.toast({
                mes: '我是左边按钮绑定的事件~',
                timeout: 1500
            });
        }
    }
}
</script>

