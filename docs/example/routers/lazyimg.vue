<template>
    <vm-layout title="LazyImg">
        <div v-for="item in srcLists">
            <div style="height: 3rem;background-color: #fff;"></div>
            <vm-lazyimg :src="item" alt="哈哈掉链子了吧"></vm-lazyimg>
        </div>
    </vm-layout>
</template>

<script>
export default {
    name: 'example-lazyimg',

    data () {
        return {
            srcLists: [
                'http://img06.tooopen.com/images/20160718/tooopen_sy_170735244783.jpg',
                'http://img06.tooopen.com/images/20161019/tooopen_sl_182404571425.jpg',
                'http://img03.tooopen.com/images/20160705/tooopen_sy_169266097857.jpg',
                'http://img05.tooopen.com/images/20140902/sy_70035613241.jpg',
                'http://img05.tooopen.com/images/20150603/tooopen_sy_128336999212.jpg',
                'http://img06.tooopen.com/images/20160709/tooopen_sy_169841375711.jpg',
                'http://img07.tooopen.com/images/20170323/tooopen_sy_202923944295.jpg',
                'http://img06.tooopen.com/images/20161123/tooopen_sy_187628854311.jpg',
                'http://img07.tooopen.com/images/20170209/tooopen_sy_198253465628.jpg',
                'http://img05.tooopen.com/images/20140909/sy_70232084616.jpg',
                'http://img05.tooopen.com/images/20150923/tooopen_sy_143539258459.jpg',
                'http://img06.tooopen.com/images/20161204/tooopen_sy_188713354445.jpg',
                'http://img06.tooopen.com/images/20170113/tooopen_sy_196830252422.jpg',
                'http://img05.tooopen.com/images/20141230/sy_78057858317.jpg',
                'http://img07.tooopen.com/images/20170306/tooopen_sy_200775896618.jpg',
                'http://img06.tooopen.com/images/20161106/tooopen_sy_185050549459.jpg',
                'http://img06.tooopen.com/images/20160913/tooopen_sy_178786212749.jpg',
                'http://img05.tooopen.com/images/20151119/tooopen_sy_149016755748.jpg',
                'http://img06.tooopen.com/images/20161214/tooopen_sy_190570171299.jpg',
            ]
        }
    }
}
</script>
