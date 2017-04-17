<template>
    <vm-layout title="Backtop">

        <vm-cell-group title="scrollView" class="demo-small-pitch">
            <vm-cell-item v-for="(item, index) in new Array(20)">
                <span slot="left">item{{index + 1}}</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-backtop content=".vm-scrollview"></vm-backtop>

    </vm-layout>
</template>