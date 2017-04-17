<template>
    <i :class="classes" :style="styles"></i>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'vm-icon',

        props: {
            name: String,
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                }
            },
            size: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '1.5rem'
            }
        },

        computed: {
            classes() {
                return 'vm-icon-' + this.name;
            },

            styles() {
                const style = {};

                if (!!this.size) {
                    style.fontSize = this.size;
                }

                if (!!this.color) {
                    style.color = this.color;
                }

                return style;
            }
        }
    }
</script>

<style lang="less">
@iconfont-icons: 'VMUI-ICONS';

@font-face {
    font-family: @iconfont-icons;
    src: url('http://at.alicdn.com/t/font_1461139240_0312312.ttf') format('truetype');
}

[class^="vm-icon-"]:before, [class*=" vm-icon-"]:before {
    font-family: @iconfont-icons;
    font-size: inherit;
}

.vm-icon-footmark:before {
    content: '\e636';
}

.vm-icon-discount:before {
    content: '\e633';
}

.vm-icon-verifycode:before {
    content: '\e632';
}

.vm-icon-star-outline:before {
    content: '\e630';
}

.vm-icon-star:before {
    content: '\e631';
}

.vm-icon-weibo:before {
    content: '\e62f';
}

.vm-icon-download:before {
    content: '\e62e';
}

.vm-icon-next:before {
    content: '\e62d';
}

.vm-icon-home-outline:before {
    content: '\e62c';
}

.vm-icon-home:before {
    content: '\e63d';
}

.vm-icon-weixin:before {
    content: '\e629';
}

.vm-icon-refresh:before {
    content: '\e628';
}

.vm-icon-tencent-weibo:before {
    content: '\e627';
}

.vm-icon-search:before {
    content: '\e626';
}

.vm-icon-time:before {
    content: '\e625';
}

.vm-icon-prev:before {
    content: '\e624';
}

.vm-icon-like-outline:before {
    content: '\e639';
}

.vm-icon-like:before {
    content: '\e63a';
}

.vm-icon-setting:before {
    content: '\e623';
}

.vm-icon-delete:before {
    content: '\e622';
}

.vm-icon-sortlist:before {
    content: '\e621';
}

.vm-icon-sortlarger:before {
    content: '\e620';
}

.vm-icon-sortlargest:before {
    content: '\e61f';
}

.vm-icon-qq:before {
    content: '\e62a';
}

.vm-icon-more:before {
    content: '\e618';
}

.vm-icon-shopcart-outline:before {
    content: '\e61a';
}

.vm-icon-shopcart:before {
    content: '\e619';
}

.vm-icon-checkoff:before {
    content: '\e617';
}

.vm-icon-bad:before {
    content: '\e61c';
}

.vm-icon-video:before {
    content: '\e61d';
}

.vm-icon-clock:before {
    content: '\e61e';
}

.vm-icon-ucenter-outline:before {
    content: '\e616';
}

.vm-icon-ucenter:before {
    content: '\e615';
}

.vm-icon-warn-outline:before {
    content: '\e613';
}

.vm-icon-warn:before {
    content: '\e614';
}

.vm-icon-share1:before {
    content: '\e610';
}

.vm-icon-share2:before {
    content: '\e60e';
}

.vm-icon-share3:before {
    content: '\e60d';
}

.vm-icon-feedback:before {
    content: '\e60f';
}

.vm-icon-type:before {
    content: '\e60c';
}

.vm-icon-discover:before {
    content: '\e60b';
}

.vm-icon-good:before {
    content: '\e61b';
}

.vm-icon-shield-outline:before {
    content: '\e608';
}

.vm-icon-shield:before {
    content: '\e60a';
}

.vm-icon-qrscan:before {
    content: '\e609';
}

.vm-icon-location:before {
    content: '\e607';
}

.vm-icon-phone1:before {
    content: '\e606';
}

.vm-icon-phone2:before {
    content: '\e637';
}

.vm-icon-phone3:before {
    content: '\e63b';
}

.vm-icon-error-outline:before {
    content: '\e602';
}

.vm-icon-error:before {
    content: '\e603';
}

.vm-icon-play:before {
    content: '\e601';
}

.vm-icon-compose:before {
    content: '\e600';
}

.vm-icon-question:before {
    content: '\e62b';
}

.vm-icon-order:before {
    content: '\e638';
}
</style>
