<template>
	<div class="vm-fileupload">
		<slot></slot>
        <input
        	class="fileuploadInput"
        	@change="uploadfile"
        	type="file"
        	accept="image/*"
        	@model="fileData"
        >
	</div>
</template>

<script>
export default {
	name: 'vm-fileupload',

	data() {
		return {
			fileData: '',
		}
	},

	props: {
		url: String,	// 上传 url
		remotePath: String,	// 存储路径
		cb: Function	// 回调
	},


	methods: {
		uploadfile (upfile, callback) {
            if(!fileData) return

            let formData = new FormData()
            formData.append("file", $(".fileuploadInput")[0].files[0])
            formData.append("remotePath", this.remotePath)

            let loading = weui.loading("正在上传图片")

            $.ajax({
				url: this.url,
				data: formData,
				type: 'post',
				processData: false,
				contentType: false,
				dataType: 'json',
                success: (res)=> {
                    if (!res.err) {
                      	loading.hide();
                      	weui.toast("上传完成")
                     	cb && (res)
                    } else console.log(res.errMsg)
                }
            })
        }
	}
}
</script>

<style lang="less">

</style>