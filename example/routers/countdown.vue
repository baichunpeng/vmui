<template>
    <vm-layout title="CountDown">

        <vm-cell-group title="普通调用" class="demo-small-pitch">
            <vm-cell-item>
                <span slot="left">默认模板：</span>
                <yd-countdown slot="right" time="2017/06/06 06:06:06"></yd-countdown>
            </vm-cell-item>
            <vm-cell-item>
                <span slot="left">自定义参数模板：</span>
                <yd-countdown slot="right" time="2017/06/06 06:06:06" format="{%s}秒】{%m}分】{%h}时】{%d}天】"></yd-countdown>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="通过Slot自定义HTML模板">
            <vm-cell-item>
                <span slot="left">个位十位一体：</span>
                <yd-countdown slot="right" time="2017/08/08 08:08:08" class="demo-countdown">
                    <span style="color:red;">{%d}<i>天</i></span>
                    <span style="color:gray;">{%h}<i>时</i></span>
                    <span style="color:blue;">{%m}<i>分</i></span>
                    <span style="color:orange;">{%s}<i>秒</i></span>
                </yd-countdown>
            </vm-cell-item>
            <vm-cell-item>
                <span slot="left">个位十位分开：</span>
                <yd-countdown slot="right" time="2017/09/08 00:00:00" class="demo-countdown">
                    <em>{%d0}</em><em>{%d1}</em><em>{%d2}</em>天
                    <em>{%h1}</em><em>{%h2}</em>小时
                    <em>{%m1}</em><em>{%m2}</em>时
                    <em>{%s1}</em><em>{%s2}</em>秒
                </yd-countdown>
            </vm-cell-item>
        </vm-cell-group>

    </vm-layout>
</template>
