import QRCode from 'qrcode-npm'

export default {
    // 设置 cookie
    setCookie (name, value, path, expires) {
        var time = new Date()
        time.setTime(time.getTime() + expires)
        // 本地时区转化为 GMT 时区
        document.cookie = `${name}=${escape(value)};path=${path};expires=${time.toGMTString()};`
    },

    // 读取 cookie
    getCookie (name) {
        let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
        let arr = document.cookie.match(reg)
        return arr ? unescape(arr[2]) : null
    },

    // 删除 cokie
    delCookie (name, path) {
        this.setCookie(name, null, path, -1)
    },

    // 解析 url 获取参数
    parseQuery (url) {
        var query = {}, params, param
        if (url && url.indexOf('?') >= 0) url = url.split('?')[1]
        else return query
        params = url.split('&')
        for (let i = 0; i < params.length; i++) {
            param = params[i].split('=')
            query[param[0]] = param[1]
        }
        return query;
    },

    // 数组去重
    unique (array) {
        let n = [], o = {}
        for (var i = 0; i < array.length; i++) {
            let m = array[i]
            if (!o[m]){
                n.push(m)
                o[m] = true
            }
        }
        return n
    },

    // 转链接为二维码
    url2qrCode (url) {
        var qr = QRCode.qrcode(4, 'M')
        qr.addData(url)
        qr.make()
        let qrCode = qr.createImgTag(4)

        return $(qrCode)[0].src
    },

    // 合并对象
    extend (o, n) {
        for (let p in n){
            if (n.hasOwnProperty(p))
                o[p] = n[p]
        }

        return o
    },

    // promise ajax
    fetch (args = {}) {
        let self = this

        let opt = this.extend({
            url: '/',
            data: null,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', // 'application/x-www-form-urlencoded'
                'X-Requested-With': 'XMLHttpRequest'
            },
            async: true, // 异步/同步
            timeout: 0, // 请求时限
            onloadstart: null,   // 发送前回调
            onloadend: null, // 完成回调
        }, args)

        return new Promise (function(resolve, reject) {
            // 若正在加载 撤销请求
            if (self[opt.url]) return
            self[opt.url] = true

            // 状态分发回调
            function handler() {
                self[opt.url] = false

                if (this.readyState !== 4) {
                    return
                }
                // 成功
                if (this.status === 200) {
                    resolve(this.response)
                }
                // 失败
                else {
                    reject(new Error(this.statusText))
                }
            }

            // 新建 XMLHttpRequest 对象
            let client = new XMLHttpRequest()
            // 调用 open 方法
            if (opt.type == 'GET' && opt.data) {
                for (let i in opt.data) {
                    opt.url += `&${i}=${opt.data[i]}`
                }
            }
            opt.url = opt.url.replace('&', '?')
            client.open(opt.type, opt.url, opt.async)
            // 请求时限，超时调用 reject
            client.timeout = opt.timeout
            //设置请求头
            for (let k in opt.headers) {
                client.setRequestHeader(k, opt.headers[k])
            }

            // 返回数据格式
            client.responseType = opt.dataType

            // 开始 send 触发
            client.onloadstart = () => {
                typeof opt.onloadstart == 'function' && opt.onloadstart()
            }

            // 超时
            client.ontimeout = () => {
                reject({
                    errorType: 'timeout_error',
                    xhr: client
                })
            }

            // 服务器异常
            client.onerror = () => {
                reject({
                    errorType: 'onerror',
                    xhr: client
                })
            }

            // 请求结束（无论成功或者失败）
            client.onloadend = () => {
                typeof opt.onloadend == 'function' && opt.onloadend(client)
            }

            // onreadystatechange 回调
            client.onreadystatechange = handler

            // 发送
            try {
                client.send(opt.data)
            }
            catch (e) {
                reject({
                    errorType: 'send_error',
                    error: e
                });
            }
        })
    },

    // ajax get 快捷方法
    get (args = {}) {
        args.type = 'GET'
        return this.fetch(args)
    },

    // ajax post 快捷方法
    post (args = {}) {
        args.type = 'POST'
        return this.fetch(args)
    }
}
