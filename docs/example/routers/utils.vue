<template>
    <vm-layout title="LazyImg">
        <vm-button-group class="demo-pitch">
            <vm-button type="primary" @click.native="fetchData">fetch</vm-button>
            <!-- <vm-button type="danger">danger</vm-button>
            <vm-button type="warning">warning</vm-button>
            <vm-button type="disabled">disabled</vm-button>
            <vm-button type="hollow">hollow</vm-button>
 -->        </vm-button-group>
    </vm-layout>
</template>

<script>

export default {
    name: 'example-lazyimg',

    data () {
        return {
        }
    },

    created () {
        this.fetchData()
    },

    methods: {
        fetchData () {
            this.$.fetch({url: '/as'})
            .then(res => {
                this.$dialog.toast({mes: 'fetch success1'})
                }
            )
            .catch(err => {
                this.$dialog.toast({mes: 'fetch error'})
            }
            )
        }
    }
}
</script>
