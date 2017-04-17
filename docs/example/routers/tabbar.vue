<template>
    <vm-layout>
        <vm-navbar slot="navbar" title="TabBar">
            <router-link to="/" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </vm-navbar>

        <vm-tabbar class="demo-small-pitch">
            <vm-tabbar-item title="微信" link="/">
                <i slot="icon" class="demo-icons-weixin"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="通讯录" link="/">
                <i slot="icon" class="demo-icons-contact"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="发现" link="/">
                <i slot="icon" class="demo-icons-discover"></i>
            </vm-tabbar-item>
        </vm-tabbar>

        <vm-tabbar class="demo-small-pitch">
            <vm-tabbar-item title="微信" link="/" active>
                <i slot="icon" class="demo-icons-weixin"></i>
                <vm-badge slot="badge" type="danger">2</vm-badge>
            </vm-tabbar-item>
            <vm-tabbar-item title="通讯录" link="/">
                <i slot="icon" class="demo-icons-contact"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="发现" link="/" dot>
                <i slot="icon" class="demo-icons-discover"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="图片" link="/">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png"/>
            </vm-tabbar-item>
        </vm-tabbar>

        <vm-tabbar slot="tabbar">
            <vm-tabbar-item title="微信" link="/" active>
                <i slot="icon" class="demo-icons-weixin"></i>
                <vm-badge slot="badge" type="danger">2</vm-badge>
            </vm-tabbar-item>
            <vm-tabbar-item title="通讯录" link="/">
                <i slot="icon" class="demo-icons-contact"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="发现" link="/" dot>
                <i slot="icon" class="demo-icons-discover"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="我" link="/">
                <i slot="icon" class="demo-icons-me"></i>
            </vm-tabbar-item>
            <vm-tabbar-item title="图片" link="/">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png" />
            </vm-tabbar-item>
        </vm-tabbar>

    </vm-layout>
</template>
