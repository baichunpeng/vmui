<template>

    <vm-layout title="Cell">

        <vm-cell-group class="demo-small-pitch">
            <vm-cell-item>
                <span slot="left">姓名：</span>
                <input slot="right" type="text" placeholder="请输入您的姓名">
            </vm-cell-item>

            <vm-cell-item arrow>
                <input slot="right" type="text" placeholder="请输入您的姓名">
            </vm-cell-item>

            <vm-cell-item>
                <span slot="left">配送方式</span>
                <span slot="right">顺丰快递</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="带图标的">
            <vm-cell-item>
                <i slot="icon" class="demo-icons-phone"></i>
                <input slot="right" type="number" pattern="[0-9]*" placeholder="请输入手机号码" autocomplete="off">
                <vm-button slot="right" type="warning">获取短信验证码</vm-button>
            </vm-cell-item>

            <vm-cell-item href="#" type="link">
                <i slot="icon" class="demo-icons-like"></i>
                <span slot="left">我的收藏</span>

                <span slot="right" class="badge badge-danger">8</span>
            </vm-cell-item>

            <vm-cell-item arrow href="tel:400-888-8888" type="a">
                <i slot="icon" class="demo-icons-tel"></i>
                <span slot="left">联系客服</span>

                <span slot="right">400-888-8888</span>
            </vm-cell-item>

            <vm-cell-item href="#" arrow>
                <i slot="icon" class="demo-icons-order"></i>
                <span slot="left">我的订单</span>

                <span slot="right">查看全部订单</span>
            </vm-cell-item>

            <vm-cell-item href="#" arrow type="link">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
                <span slot="left">图标</span>

                <span slot="right">图标是image</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="下拉框">
            <vm-cell-item arrow type="label">
                <select slot="right">
                    <option value="">支付方式</option>
                    <option value="1">支付宝</option>
                    <option value="2">微信</option>
                    <option value="3">财付通</option>
                </select>
            </vm-cell-item>

            <vm-cell-item arrow>
                <span slot="left">性别：</span>
                    <select slot="right">
                        <option value="">请选择性别</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="3">未知</option>
                    </select>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="多选">
            <vm-cell-item type="checkbox">
                <span slot="left">多选一</span>
                <input slot="right" type="checkbox" value="Han MeiMei" v-model="checkedNames"/>
            </vm-cell-item>

            <vm-cell-item type="checkbox">
                <span slot="left">多选二</span>
                <input slot="right" type="checkbox" value="Li Lei" v-model="checkedNames"/>
            </vm-cell-item>

            <vm-cell-item type="checkbox">
                <span slot="left">多选三</span>
                <input slot="right" type="checkbox" value="Jim Green" v-model="checkedNames"/>
            </vm-cell-item>

            <vm-cell-item>
                <span slot="left">选中的值：</span>
                <span slot="right">{{checkedNames}}</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="单选">
            <vm-cell-item type="radio">
                <span slot="left">单选一</span>
                <input slot="right" type="radio" value="Lili" v-model="picked"/>
            </vm-cell-item>

            <vm-cell-item type="radio">
                <span slot="left">单选二</span>
                <input slot="right" type="radio" value="Lucy" v-model="picked"/>
            </vm-cell-item>

            <vm-cell-item>
                <span slot="left">选中的值：</span>
                <span slot="right">{{picked}}</span>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="复选框">
            <vm-cell-item type="label">
                <div slot="left">设为默认地址 - {{vmswitch}}</div>
                <vm-switch slot="right" v-model="vmswitch"></vm-switch>
            </vm-cell-item>
        </vm-cell-group>

        <vm-cell-group title="文本域">
            <vm-cell-item>
                <yd-textarea slot="right" placeholder="请输入您的银行卡卡号和密码" maxlength="100"></yd-textarea>
            </vm-cell-item>
        </vm-cell-group>

    </vm-layout>

</template>

<script type="text/babel">
    export default {
        data() {
            return {
                checkedNames: ['Han MeiMei'],
                picked: 'Lucy',
                vmswitch: true
            }
        }
    }
</script>
