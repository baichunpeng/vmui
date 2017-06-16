<template>
    <vm-layout title="Badge">
        <aside class="demo-tip">
            <p>badge包含默认圆形样式和方形样式</p>
            <p>五中颜色：default/primary/danger/warning/hollow</p>
        </aside>

        <div class="demo-badege">
            <div class="demo-badege-title">圆形角标：</div>
            <div class="demo-small-pitch">
                <vm-badge>1</vm-badge>
                <vm-badge type="primary">2</vm-badge>
                <vm-badge type="danger">3</vm-badge>
                <vm-badge type="warning">4</vm-badge>
                <vm-badge type="hollow">5</vm-badge>
            </div>

            <div class="demo-small-pitch">
                <vm-badge>123</vm-badge>
                <vm-badge type="primary">321</vm-badge>
                <vm-badge type="danger">333</vm-badge>
                <vm-badge type="warning">4444</vm-badge>
                <vm-badge type="hollow">55555</vm-badge>
                <vm-badge bgcolor="#000" color="#FFF">custom color</vm-badge>
            </div>

            <div class="demo-badege-title">方形角标：</div>
            <div class="demo-small-pitch">
                <vm-badge shape="square">1</vm-badge>
                <vm-badge shape="square" type="primary">2</vm-badge>
                <vm-badge shape="square" type="danger">3</vm-badge>
                <vm-badge shape="square" type="warning">4</vm-badge>
                <vm-badge shape="square" type="hollow">5</vm-badge>
            </div>

            <div class="demo-small-pitch">
                <vm-badge shape="square">123</vm-badge>
                <vm-badge shape="square" type="primary">321</vm-badge>
                <vm-badge shape="square" type="danger">333</vm-badge>
                <vm-badge shape="square" type="warning">4444</vm-badge>
                <vm-badge shape="square" type="hollow">55555</vm-badge>
                <vm-badge shape="square" bgcolor="#000" color="#FFF">custom color</vm-badge>
            </div>

        </div>

    </vm-layout>
</template>
