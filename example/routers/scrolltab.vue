<template>
    <vm-layout>
        <vm-navbar slot="navbar" title="ScrollTab">
            <router-link to="/tabs" slot="left">
                <vm-navbar-back-icon></vm-navbar-back-icon>
            </router-link>
        </vm-navbar>

        <vm-scrolltab>
            <vm-scrolltab-panel label="空调" icon="demo-icons-category1">
                <div style="height: 350px;background-color: gray;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="冰箱" icon="demo-icons-category2" active>
                <div style="height: 350px;background-color: blue;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="洗衣机" icon="demo-icons-category3">
                <div style="height: 350px;background-color: yellow;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="热水器" icon="demo-icons-category4">
                <div style="height: 350px;background-color: green;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="厨房大家电" icon="demo-icons-category5">
                <div style="height: 350px;background-color: saddlebrown;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="厨房小家电" icon="demo-icons-category6">
                <div style="height: 350px;background-color: darkgoldenrod;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="生活家电" icon="demo-icons-category7">
                <div style="height: 350px;background-color: indianred;"></div>
            </vm-scrolltab-panel>

            <vm-scrolltab-panel label="风扇" icon="demo-icons-category8">
                <div style="height: 350px;background-color: aqua;"></div>
            </vm-scrolltab-panel>
        </vm-scrolltab>

    </vm-layout>
</template>
