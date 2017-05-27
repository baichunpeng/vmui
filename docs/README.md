> utils
- fetch
上传文件
```html
<input type="file" @change="uploadFile">
```
```js
uploadFile (event) {
    let formData = new FormData(), self = this
            formData.append("file", event.target.files[0])
            formData.append("remotePath", '/userinfo')

    vm.$.post({
        url: vm.config.codeOrigin + '/site/uploadImg',
        data: formData,
        progress: false,    // 是否格式化data
        headers: {}
    }).then(res => {
        // todo。。。
    })
    .catch(err => this.$dialog.toast({mes: err.errMsg}))
},
```