<template>
    <vm-layout title="CitySelect">

        <vm-cell-group title="默认调用（本地数据）" class="demo-small-pitch">
            <vm-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly class="cell-input" placeholder="请选择收货地址">
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="设置默认值（ajax请求的数据）">
            <vm-cell-item arrow>
                <span slot="left">所在地区：</span>
                <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly class="cell-input" placeholder="请选择收货地址">
            </vm-cell-item>
        </vm-cell-group>

        <vm-cityselect
            v-model="show1"
            :done="result1"
        ></vm-cityselect>

        <vm-cityselect
            url="http://yqj.meiwan.me/api/city/combine/list"
            v-model="show2"
            :done="result2"
            province="新疆"
            city="石河子"
            area="城区"
        ></vm-cityselect>

    </vm-layout>
</template>

<script>
export default {
    data() {
        return {
            show1: false,
            show2: false,
            model1: '',
            model2: '新疆 石河子 城区'
        }
    },
    methods: {
        result1(ret) {
            this.model1 = ret.province + ' ' + ret.city + ' ' + ret.area;
        },
        result2(ret) {
            this.model2 = ret.province + ' ' + ret.city + ' ' + ret.area;
        }
    }
}
</script>
