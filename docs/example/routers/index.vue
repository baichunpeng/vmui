<template>
    <vm-layout>
        <h1 class="demo-logo"><img src="http://static.ydcss.com/ydui/img/logo.png"></h1>
        <h2 class="demo-detail-title">VMUI<br>基于Vue2.x的移动端UI组件库</h2>

        <div v-for="items in lists">
            <div class="vm-gridstitle">{{items.name}}</div>
            <vm-grids-group rows="4">
                <vm-grids-item v-for="item in items.list" :link="item.link">
                    <i slot="icon" :class="item.icon"></i>
                    <span slot="text">{{item.name}}</span>
                </vm-grids-item>
            </vm-grids-group>
        </div>
    </vm-layout>
</template>

<script>
    export default {
        data() {
            return {
                lists: [{
                    name: 'icon',
                    list: [
                        {icon: 'demo-icons-icons', name: 'Icons', link: '/icons'},
                    ]
                }, {
                    name: '布局',
                    list: [
                        {icon: 'demo-icons-grids', name: 'Layout', link: '/layout'},
                        {icon: 'demo-icons-grids', name: 'Grids', link: '/grids'},
                        {icon: 'demo-icons-tabbar', name: 'Navbar', link: '/navbar'},
                        {icon: 'demo-icons-tabbar', name: 'Tabbar', link: '/tabbar'},
                    ]
                }, {
                    name: '样式组件',
                    list: [
                        {icon: 'demo-icons-button', name: 'Button', link: '/button'},
                        {icon: 'demo-icons-badge', name: 'Badge', link: '/badge'},
                        {icon: 'demo-icons-cell', name: 'Cell', link: '/cell'},
                        {icon: 'demo-icons-list', name: 'List', link: '/list'},
                        // {icon: 'demo-icons-keyboard', name: 'KeyBoard', link: '/keyboard'},
                        // {icon: 'demo-icons-progressbar', name: 'ProgressBar', link: '/progressbar'},
                        // {icon: 'demo-icons-sendcode', name: 'SendCode', link: '/sendcode'},
                    ]
                }, {
                    name: 'js组件',
                    list: [
                        {icon: 'demo-icons-dialog', name: 'Dialog', link: '/dialog'},
                        {icon: 'demo-icons-popup', name: 'Popup', link: '/popup'},
                        {icon: 'demo-icons-actionsheet', name: 'ActionSheet', link: '/actionsheet'},
                        {icon: 'demo-icons-tabs', name: 'Tabs', link: '/tabs'},
                        {icon: 'demo-icons-slider', name: 'Slider', link: '/slider'},
                        {icon: 'demo-icons-cityselect', name: 'CitySelect', link: '/cityselect'},
                        {icon: 'demo-icons-spinner', name: 'Spinner', link: '/spinner'},
                        {icon: 'demo-icons-actionsheet', name: 'BackTop', link: '/backtop'},
                        {icon: 'demo-icons-actionsheet', name: 'LazyImg', link: '/lazyimg'},
                        {icon: 'demo-icons-actionsheet', name: 'Utils', link: '/utils'},
                        // {icon: 'demo-icons-countdown', name: 'CountDown', link: '/countdown'},
                        // {icon: 'demo-icons-countup', name: 'CountUp', link: '/countup'},
                        // {icon: 'demo-icons-rate', name: 'Rate', link: '/rate'},
                    ]
                }]
            }
        }
    }
</script>
