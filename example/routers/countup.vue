<template>
    <vm-layout title="CountUp">

        <vm-cell-group class="demo-small-pitch">

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="1200"
                ></yd-countup>
                <span slot="right">普通调用</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="100"
                        decimals="2"
                ></yd-countup>
                <span slot="right">添加小数</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="100"
                        decimals="2"
                        prefix="$"
                        suffix="&"
                ></yd-countup>
                <span slot="right">添加前后符号</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="9998"
                        decimals="2"
                        separator=","
                ></yd-countup>
                <span slot="right">添加分割符</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="998.658"
                        decimals="3"
                        :useEasing="true"
                ></yd-countup>
                <span slot="right">使用Easy动画效果</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="9998"
                        duration="5"
                        decimals="2"
                ></yd-countup>
                <span slot="right">设置动画时长</span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        :endnum="initnum"
                        separator=","
                        decimal="."
                ></yd-countup>
                <span slot="right"><vm-button @click.native="initnum = 100" type="warning">改变结束值至100</vm-button></span>
            </vm-cell-item>

            <vm-cell-item>
                <yd-countup
                        slot="left"
                        endnum="100"
                        suffix="%"
                        :start="start"
                ></yd-countup>
                <span slot="right"><vm-button @click.native="start = true">开始</vm-button></span>
            </vm-cell-item>

        </vm-cell-group>
    </vm-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                initnum: 50,
                start: false
            }
        }
    }
</script>
