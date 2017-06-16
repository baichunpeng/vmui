<template>
    <vm-layout title="Grids">

        <vm-grids-group :rows="2" title="等分2列(带图标)">
            <vm-grids-item>
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
                <span slot="text">image</span>
            </vm-grids-item>
            <vm-grids-item>
                <i slot="icon" class="demo-icons-cell"></i>
                <span slot="text">iconfont</span>
            </vm-grids-item>
        </vm-grids-group>

        <vm-grids-group :rows="3" title="等分3列">
            <vm-grids-item v-for="n in 6">
                <span slot="text">grids-3</span>
            </vm-grids-item>
        </vm-grids-group>

        <vm-grids-group rows="4" title="等分4列">
            <vm-grids-item v-for="n in 8">
                <span slot="text">grids-4</span>
            </vm-grids-item>
        </vm-grids-group>

        <vm-grids-group :rows="5" title="等分5列">
            <vm-grids-item v-for="n in 5">
                <span slot="text">grids-5</span>
            </vm-grids-item>
        </vm-grids-group>

    </vm-layout>
</template>
