<template>
    <vm-layout title="List">

        <vm-cell-group title="排版样式" class="demo-small-pitch">
            <vm-cell-item arrow type="link" href="/list.theme/1">
                <span slot="left">theme1</span>
            </vm-cell-item>
            <vm-cell-item arrow type="link" href="/list.theme/2">
                <span slot="left">theme2</span>
            </vm-cell-item>
            <vm-cell-item arrow type="link" href="/list.theme/3">
                <span slot="left">theme3</span>
            </vm-cell-item>
            <vm-cell-item arrow type="link" href="/list.theme/4">
                <span slot="left">theme4</span>
            </vm-cell-item>
            <vm-cell-item arrow type="link" href="/list.theme/5">
                <span slot="left">theme5</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="异步数据加载">
            <vm-cell-item arrow type="link" href="/list.infinitescroll">
                <span slot="left">Infinite Scroll</span>
                <span slot="right">滚动加载</span>
            </vm-cell-item>
            <vm-cell-item arrow type="link" href="/list.pullrefresh">
                <span slot="left">Pull Refresh</span>
                <span slot="right">下拉刷新</span>
            </vm-cell-item>
        </vm-cell-group>

    </vm-layout>
</template>
