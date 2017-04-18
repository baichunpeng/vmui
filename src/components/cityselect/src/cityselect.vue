<template>
    <div>
        <div class="vm-mask-cityselect" v-show="show" @click.stop="close"></div>
        <div class="vm-content-cityselect" :class="show ? 'vm-cityselect-active' : ''">
            <div class="vm-cityselect-header">
                <p class="vm-cityselect-title">所在地区</p>
                <div v-show="ready" class="vm-cityselect-nav">
                    <a href="javascript:;"
                       v-show="!!nav.txt1"
                       @click.stop="backoffView(0)"
                       :class="nav.index == 0 ? 'vm-cityselect-nav-active' : ''">{{nav.txt1}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt2"
                       @click.stop="backoffView(1)"
                       :class="nav.index == 1 ? 'vm-cityselect-nav-active' : ''">{{nav.txt2}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt3"
                       @click.stop="forwardView(true)"
                       :class="nav.index == 2 ? 'vm-cityselect-nav-active' : ''">{{nav.txt3}}</a>
                </div>
            </div>
            <div v-show="!ready" class="vm-cityselect-loading">加载中</div>
            <ul v-show="ready" class="vm-cityselect-content" :class="activeClasses">
                <li class="vm-cityselect-item" ref="provinceBox">
                    <div class="vm-cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeprovince ? 'vm-cityselect-item-active' : ''"
                           v-for="item in citys"
                           @click.stop="chooseprovince(item)"
                        ><span>{{item.name}}</span></a>
                    </div>
                </li>
                <li class="vm-cityselect-item" ref="cityBox">
                    <div class="vm-cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeCity ? 'vm-cityselect-item-active' : ''"
                           v-for="item in cityArray"
                           @click.stop="chooseCity(item)"
                        ><span>{{item.name}}</span></a>
                    </div>
                </li>
                <li class="vm-cityselect-item" ref="areaBox">
                    <div class="vm-cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeArea ? 'vm-cityselect-item-active' : ''"
                           v-for="item in areaArray"
                           @click.stop="chooseArea(item)"
                        ><span>{{item.name}}</span></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {addClass, removeClass, getScrollview} from '../../../utils/assist';
import U from '../../Utils';
import Citys from './vmui.citys';
import Toast from '../../dialog/src/toast';

export default {
    name: 'vm-cityselect',
    data() {
        return {
            citys: [],  // 地址数组
            show: false,    // 显示状态
            nav: {  // nav
                index: 0,
                txt1: '请选择',
                txt2: '',
                txt3: ''
            },
            activeprovince: '',         // 选择的省
            activeprovinceId: Number,   // 选择的省 id
            activeCity: '',
            activeCityId: Number,
            activeArea: '',
            activeAreaId: Number,
            cityArray: [],
            areaArray: [],
            activeClasses: '',
            itemHeight: 40
        }
    },
    props: {
        ready: {
            type: Boolean,
            default: true
        },
        url: String,        // ajax 请求地址
        province: String,   // 初始省
        provinceId: Number, // 初始省 id
        city: String,
        cityId: Number,
        area: String,
        areaId: Number,
        done: Function, // 选择结束回调
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(val) {
            val && this.isIOS && addClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');

            this.show = val;
        },
        ready(val) {
            val && setTimeout(this.init, 0);
        }
    },
    mounted() {
        this.fetchData(this.init)
    },

    methods: {
        // 初始化
        init() {
            if (!this.ready)return;

            this.setDefalutValue();

            this.scrollView = getScrollview(this.$el);

            this.isIOS = !!(window.navigator && window.navigator.userAgent || '').match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        },

        fetchData (cb) {
            // 请求多级列表（默认地址）
            if (this.url) {
                U.get({url: this.url})
                .then(res => {
                    this.citys = res.data
                    cb()
                })
                .catch(err => Toast({mes: err}))
            }
            // 调用本地
            else {
                this.citys = Citys
                cb()
            }
        },

        // 选择省
        chooseprovince(data) {
            let name = data.name,
                id = data.id,
                datas = data.child

            this.nav.index = 1;
            this.nav.txt1 = this.activeprovince = name;
            this.activeprovinceId = id;
            this.nav.txt2 = '请选择';
            this.nav.txt3 = '';
            this.cityArray = datas;
            this.activeCity = '';
        },

        // 选择市
        chooseCity(data) {
            let name = data.name,
                id = data.id,
                datas = data.child

            this.nav.txt2 = this.activeCity = name;
            this.activeCityId = id;

            this.activeArea = '';
            if (!datas || datas.length <= 0) {
                this.activeAreaId = null
                this.returnValue();
                return;
            }
            this.nav.txt3 = '请选择';
            this.areaArray = datas;
            this.forwardView(true);
        },

        // 选择区
        chooseArea(data) {
            let name = data.name,
                id = data.id

            this.nav.txt3 = this.activeArea = name;
            this.activeAreaId = id;
            this.returnValue();
        },

        // 初始默认地址
        setDefalutValue() {
            if (!this.province && !this.provinceId) return

            // 默认省
            this.citys.every((item1, index1) => {
                if (item1.name == this.province || item1.id == this.provinceId) {

                    const provinceBox = this.$refs.provinceBox;
                    provinceBox.scrollTop = index1 * this.itemHeight - provinceBox.offsetHeight / 3;

                    this.nav.index = 1;
                    this.nav.txt1 = this.activeprovince = item1.name;
                    this.activeprovinceId = item1.id
                    this.nav.txt2 = '请选择';

                    const _cityData = this.cityArray = item1.child;

                    // 默认市
                    _cityData.every((item2, index2) => {

                        if (item2.name == this.city || item2.id == this.cityId) {

                            const cityBox = this.$refs.cityBox;
                            cityBox.scrollTop = index2 * this.itemHeight - cityBox.offsetHeight / 3;

                            this.nav.txt2 = this.activeCity = item2.name;
                            this.activeCityId = item2.id;

                            const _areaData = this.areaArray = item2.child;

                            // 默认区
                            _areaData.every((item3, index3) => {
                                if (item3.name == this.area || item3.id == this.areaId) {
                                    if (_areaData.length > 0) {
                                        this.nav.index = 2;
                                        this.nav.txt3 = '请选择';
                                        this.forwardView(false);
                                    }

                                    if (index3 > -1) {

                                        const areaBox = this.$refs.areaBox;
                                        areaBox.scrollTop = index3 * this.itemHeight - areaBox.offsetHeight / 3;

                                        this.nav.txt3 = this.activeArea = item3.name;
                                        this.activeAreaId = item3.id;
                                    }
                                    return false
                                }
                                return true
                            })

                            return false;
                        }
                        return true;
                    });
                    return false;
                }
                return true;
            });
        },

        // 返回回调（parames:省市区）
        returnValue() {
            this.done({
                province: this.activeprovince,
                provinceId: this.activeprovinceId,
                city: this.activeCity,
                cityId: this.activeCityId,
                area: this.activeArea,
                areaId: this.activeAreaId
            });
            this.close();
        },

        // 关闭
        close() {
            this.isIOS && removeClass(this.scrollView, 'vm-fix-ios-overflow-scrolling-bug');

            this.$emit('input', false);
            this.show = false;
        },
        backoffView(index) {
            this.nav.index = index;
            this.activeClasses = 'vm-cityselect-move-animate vm-cityselect-prev';
        },
        forwardView(animate) {
            this.nav.index = 2;
            this.activeClasses = (animate ? 'vm-cityselect-move-animate' : '') + ' vm-cityselect-next';
        }
    },

    destroyed() {
        this.close();
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-mask-cityselect {
    .mask(rgba(0, 0, 0, .4), @base-zindex * 500);
}

.vm-content-cityselect {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background-color: #fff;
    z-index: @base-zindex * 1000;
    transform: translate(0, 100%);
    transition: transform .3s;
    &.vm-cityselect-active {
        transform: translate(0, 0);
    }
}

.vm-cityselect-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    &:after {
        .bottom-line(@line-color);
    }
}

.vm-cityselect-title {
    width: 100%;
    font-size: .3rem*@suiremscale;
    text-align: center;
    height: 45px;
    line-height: 45px;
    position: relative;
    &:after {
        .bottom-line(@line-high-color);
    }
}

.vm-cityselect-nav {
    width: 100%;
    padding-left: .2rem*@suiremscale;
    overflow: hidden;
    display: flex;
    > a {
        font-size: .26rem*@suiremscale;
        color: #222;
        display: block;
        height: 40px;
        line-height: 46px;
        padding: 0 .2rem*@suiremscale;
        position: relative;
        margin-right: .15rem*@suiremscale;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40%;
        &.vm-cityselect-nav-active {
            color: #F23030;
            &:after {
                content: '';
                width: 100%;
                height: 2px;
                background-color: #F23030;
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 2;
            }
        }
    }
}

.vm-cityselect-content {
    height: 100%;
    padding-top: 85px;
    width: 100%;
    display: flex;
    &.vm-cityselect-move-animate {
        transition: transform .3s;
    }
    &.vm-cityselect-next {
        transform: translate(-50%, 0);
    }
    &.vm-cityselect-prev {
        transform: translate(0, 0);
    }
    > .vm-cityselect-item {
        display: block;
        height: inherit;
        width: 50%; /* for old android */
        flex: 0 0 50%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #FFF;
        &::-webkit-scrollbar {
            width: 0;
        }
        &:nth-child(2n) {
            background-color: #F5F5F5;
        }
    }
}

.vm-cityselect-item-box {
    width: 100%;
    height: inherit;
    display: block;
    padding: 0 .4rem*@suiremscale;
    > a {
        color: #333;
        font-size: .26rem*@suiremscale;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        z-index: 1;
        &:before {
            .bottom-line(@line-color);
        }
        &:active {
            background: none; /* for firefox */
        }
        span {
            flex: 1;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.vm-cityselect-item-active {
            color: #F23030;
            &:after {
                display: block;
                content: '\E600';
                font-family: @iconfont-inlay;
            }
        }
    }
}

.vm-cityselect-loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .26rem*@suiremscale;
    color: #999;
}
</style>
