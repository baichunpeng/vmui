<template>
    <vm-layout title="Slider">
        <div class="demo-small-pitch">

            <vm-slider autoplay="3000" initIndex="2">
                <vm-slider-item>
                    <div class="item">
                        item <span>1</span>
                    </div>
                </vm-slider-item>
                <vm-slider-item>
                    <div class="item">
                        item <span>2</span>
                    </div>
                </vm-slider-item>
                <vm-slider-item>
                    <div class="item">
                        item <span>3</span>
                    </div>
                </vm-slider-item>
            </vm-slider>

        </div>
    </vm-layout>
</template>

<style scoped lang="less">
.item {
    padding: 2rem 0;
    text-align: center;
    background: #fff;
    span {
        font-size: 5rem;
        font-weight: 700;
    }
}
</style>
