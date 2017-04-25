// 请求微信签名 并配置接口

import wx from 'weixin-js-sdk'
import U from '../../utils'
import {Toast} from '../../dialog'

export default (wxConfig, readyBack) => {
    U.get({
        url: wxConfig.url,
        data: (wxConfig.data || wxConfig.data == {}) ? wxConfig.data : {
            url: location.href
        }
    }).then (res => {
        wx.config({
            'debug': false,
            'appId': res.data.appId,
            'timestamp': res.data.timestamp,
            'nonceStr': res.data.nonceStr,
            'signature': res.data.signature,
            'jsApiList': [
            	'checkJsApi', 'onMenuShareTimeline',
            	'onMenuShareAppMessage', 'onMenuShareQQ',
            	'onMenuShareWeibo', 'hideMenuItems',
            	'showMenuItems', 'hideAllNonBaseMenuItem',
            	'showAllNonBaseMenuItem', 'translateVoice',
            	'startRecord', 'stopRecord',
            	'onRecordEnd', 'playVoice',
            	'pauseVoice', 'stopVoice',
            	'uploadVoice', 'downloadVoice',
            	'chooseImage', 'previewImage',
            	'uploadImage', 'downloadImage',
            	'getNetworkType', 'openLocation',
            	'getLocation', 'hideOptionMenu',
            	'showOptionMenu', 'closeWindow',
            	'scanQRCode', 'chooseWXPay',
            	'openProductSpecificView', 'addCard',
            	'chooseCard', 'openCard'
            ]
        })

        wx.ready(() => {
            readyBack && readyBack(wx)
        })
    }).catch(err => Toast({mes: err.errMsg}))
}