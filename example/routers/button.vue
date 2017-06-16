<template>
    <vm-layout title="Button">

        <vm-button-group class="demo-pitch">
            <div class="title">small</div>
            <vm-button type="primary">primary</vm-button>
            <vm-button type="danger">danger</vm-button>
            <vm-button type="warning">warning</vm-button>
            <vm-button type="disabled">disabled</vm-button>
            <vm-button type="hollow">hollow</vm-button>

            <div class="title">large</div>
            <vm-button size="large" type="primary">primary</vm-button>
            <vm-button size="large" type="danger">danger</vm-button>
            <vm-button size="large" type="warning">warning</vm-button>
            <vm-button size="large" type="disabled" disabled>disabled</vm-button>
            <vm-button size="large" type="hollow">hollow</vm-button>
            <vm-button size="large" bgcolor="#000" color="#FFF">Custom Color</vm-button>

        </vm-button-group>

    </vm-layout>
</template>

<style scoped lang="less">
.title {
    padding: 0.875rem 0.6rem 0.25rem;
    font-size: 0.75rem;
    text-align: left;
    color: #888;
    background-color: #F5F5F5;
}
.vm-btn-block:nth-of-type(6) {
    margin: 0
}
</style>
