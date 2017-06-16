<template>
    <vm-layout title="Clip">
        <div class="demo-pitch">
            <div class="title">原图</div>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
            ></vm-clip>

            <div class="title">横向居中，纵向上/中/下</div>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="center"
                positionY="top"
                width="32%"
                height="100px"
            ></vm-clip>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="center"
                positionY="center"
                width="32%"
                height="100px"
            ></vm-clip>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="center"
                positionY="bottom"
                width="32%"
                height="100px"
            ></vm-clip>

            <div class="title">纵向居中，横向左/中/右</div>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="left"
                positionY="center"
                width="32%"
                height="100px"
            ></vm-clip>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="center"
                positionY="center"
                width="32%"
                height="100px"
            ></vm-clip>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                positionX="right"
                positionY="center"
                width="32%"
                height="100px"
            ></vm-clip>
            <div class="title">scale: cover</div>
            <vm-clip
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                scale="cover"
                width="200px"
                height="200px"
            ></vm-clip>
            <div class="title">scale: contain</div>
            <vm-clip
                class="vm-clip-contain"
                src="http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg"
                scale="contain"
                width="200px"
                height="200px"
            ></vm-clip>
        </div>
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
.vm-clip-contain {
    border: 1px dashed #ff9800;
}
.demo-pitch {
    padding: 0 .6rem;
}
</style>
