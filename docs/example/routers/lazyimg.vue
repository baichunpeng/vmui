<template>
    <vm-layout title="LazyImg">
        <div v-for="item in new Array(10)">
            <div style="height: 3rem;background-color: #CCC;"></div>
            <vm-lazyimg src="//static.ydcss.com/uploads/ydui/1.jpg" style="width: 100%;"></vm-lazyimg>
            <div style="height: 3rem;background-color: #CCC;"></div>
            <vm-lazyimg src="//static.ydcss.com/uploads/ydui/2.jpg" style="width: 100%;"></vm-lazyimg>
            <div style="height: 3rem;background-color: #CCC;"></div>
            <vm-lazyimg src="//static.ydcss.com/uploads/ydui/3.jpg" style="width: 100%;"></vm-lazyimg>
        </div>
    </vm-layout>
</template>
