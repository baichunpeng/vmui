<!--
tpl:
    <input slot="right" type="text" @click.stop="show1 = true" v-model="model1" readonly placeholder="请选择收货地址">
    <CitySelect v-model="show1" :done="result1" :provinceId="2" :cityId="25" :areaId="254"></CitySelect>

js:
    import CitySelect from '../../components/cityselect'

    data:
        show1: false,
        model1: '',

    components: {
        CitySelect
    },

methods:
    result1(ret) {
        this.model1 = ret.province + ' ' + ret.provinceId + ' ' + ret.city + ' ' + ret.cityId + ' ' + ret.area+ ' ' + ret.areaId;
    }

注意：初始省/市/区 名称 和 id 不能同时设置
 -->

<template>
    <div class="vmui">
        <div class="mask-cityselect" v-show="show" @click.stop="close"></div>
        <div class="m-cityselect" :class="show ? 'cityselect-active' : ''">
            <div class="cityselect-header">
                <p class="cityselect-title">所在地区</p>
                <div v-show="ready" class="cityselect-nav">
                    <a href="javascript:;"
                       v-show="!!nav.txt1"
                       @click.stop="backoffView(0)"
                       :class="nav.index == 0 ? 'cityselect-nav-active' : ''">{{nav.txt1}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt2"
                       @click.stop="backoffView(1)"
                       :class="nav.index == 1 ? 'cityselect-nav-active' : ''">{{nav.txt2}}</a>
                    <a href="javascript:;"
                       v-show="!!nav.txt3"
                       @click.stop="forwardView(true)"
                       :class="nav.index == 2 ? 'cityselect-nav-active' : ''">{{nav.txt3}}</a>
                </div>
            </div>
            <div v-show="!ready" class="cityselect-loading">加载中</div>
            <ul v-show="ready" class="cityselect-content" :class="activeClasses">
                <li class="cityselect-item" ref="provinceBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeprovince ? 'cityselect-item-active' : ''"
                           v-for="item in citys"
                           @click.stop="chooseprovince(item)"
                        ><span>{{item.name}}</span></a>
                    </div>
                </li>
                <li class="cityselect-item" ref="cityBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeCity ? 'cityselect-item-active' : ''"
                           v-for="item in cityArray"
                           @click.stop="chooseCity(item)"
                        ><span>{{item.name}}</span></a>
                    </div>
                </li>
                <li class="cityselect-item" ref="areaBox">
                    <div class="cityselect-item-box">
                        <a href="javascript:;"
                           :class="item.name == activeArea ? 'cityselect-item-active' : ''"
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


export default {
    name: 'vm-cityselect',
    data() {
        return {
            citys: [],
            show: false,
            nav: {
                index: 0,
                txt1: '请选择',
                txt2: '',
                txt3: ''
            },
            activeprovince: '',         // 当前省
            activeprovinceId: Number,   // 当前省 id
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
        done: Function,
        value: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(val) {
            val && this.isIOS && addClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

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
                U.get(this.url)
                    .then(res => {
                        this.citys = res.data
                        cb()
                    })
                    .catch(err => $.toast(err.errMsg))
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
            this.isIOS && removeClass(this.scrollView, 'g-fix-ios-overflow-scrolling-bug');

            this.$emit('input', false);
            this.show = false;
        },
        backoffView(index) {
            this.nav.index = index;
            this.activeClasses = 'cityselect-move-animate cityselect-prev';
        },
        forwardView(animate) {
            this.nav.index = 2;
            this.activeClasses = (animate ? 'cityselect-move-animate' : '') + ' cityselect-next';
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

.mask-cityselect {
    .mask(rgba(0, 0, 0, .4), @base-zindex * 500);
}

.m-cityselect {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 75%;
    background-color: #fff;
    z-index: @base-zindex * 1000;
    transform: translate(0, 100%);
    transition: transform .3s;
    &.cityselect-active {
        transform: translate(0, 0);
    }
}

.cityselect-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    &:after {
        .bottom-line(@line-color);
    }
}

.cityselect-title {
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

.cityselect-nav {
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
        &.cityselect-nav-active {
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

.cityselect-content {
    height: 100%;
    padding-top: 85px;
    width: 100%;
    display: flex;
    &.cityselect-move-animate {
        transition: transform .3s;
    }
    &.cityselect-next {
        transform: translate(-50%, 0);
    }
    &.cityselect-prev {
        transform: translate(0, 0);
    }
    > .cityselect-item {
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

.cityselect-item-box {
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
        &.cityselect-item-active {
            color: #F23030;
            &:after {
                display: block;
                content: '\E600';
                font-family: @iconfont-inlay;
            }
        }
    }
}

.cityselect-loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .26rem*@suiremscale;
    color: #999;
}
</style>
