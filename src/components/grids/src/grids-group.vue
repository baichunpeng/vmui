<template>
    <div>
        <div class="vm-gridstitle" v-if="title">{{title}}</div>
        <div :class="classes">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default{
        name: 'vm-grids-group',
        props: {
            rows: {
                validator(value) {
                    return ['2', '3', '4', '5'].indexOf(value + '') > -1;
                },
                default: '4'
            },
            title: String
        },
        computed: {
            classes() {
                return 'vm-grids-' + this.rows;
            }
        }
    }
</script>
