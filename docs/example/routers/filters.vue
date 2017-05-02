<template>
    <vm-layout title="LazyImg">
        <vm-button-group class="demo-pitch">
            <vm-button type="primary">
                {{ 100 | number(2) }}
            </vm-button>
            <br>
            <br>
            <vm-button type="danger">
                {{ '2016-01-28T01:57:22.000Z' | date('YYYY-MM-DD HH:MM:SS') }}
            </vm-button>
            <br>
            <br>
            <vm-button type="warning">
                {{ '2016-01-28T01:57:22.000Z' | date('YYYY-mm-dd HHhh:mm:ss') }}
            </vm-button>
            <br>
            <br>
            <vm-button type="disabled">{{[0,1,2,3] | limitTo(2)}}</vm-button>
            <!-- <vm-button type="hollow">hollow</vm-button> -->
        </vm-button-group>
    </vm-layout>
</template>

<script>
export default {
    name: 'example-filters',

    data () {

    },

    // filters: this.$Filters
}
</script>
