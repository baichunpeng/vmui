<template>
    <span><slot></slot><i class="next-icon" :style="{color: color}"></i></span>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'vm-navbar-next-icon',
        props: {
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#5C5C5C'
            }
        }
    }
</script>
