<template>
    <vm-layout>

        <vm-navbar slot="navbar" title="InfiniteScroll">
            <router-link to="/list" slot="left">
                <vm-navbar-back-icon></vm-navbar-back-icon>
            </router-link>
        </vm-navbar>

        <vm-infinitescroll :on-infinite="loadList">

            <yd-list theme="1" slot="list">
                <yd-list-item v-for="item in list">
                    <img slot="img" :src="item.img">
                    <span slot="title">{{item.title}}</span>
                    <yd-list-other slot="other">
                        <div>
                            <span class="list-price"><em>¥</em>{{item.marketprice}}</span>
                            <span class="list-del-price">¥{{item.productprice}}</span>
                        </div>
                        <div>content</div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>

            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

            <!-- 加载中提示 -->
            <span slot="loadingTip">正在加载中...</span>

        </vm-infinitescroll>

    </vm-layout>
</template>

<script>
// 如果增加返回定位功能，则要在sessionStorage里缓存列表、page、scrollTop数据
export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
            list: []
        }
    },

    created () {
        this.loadList()
    },

    methods: {
        loadList() {
            this.$http.jsonp('http://list.ydui.org/getdata.php?type=backposition', {
                params: {
                    page: this.page,
                    pagesize: this.pageSize
                }
            }).then(function (response) {
                const _list = response.body;

                this.list = [...this.list, ..._list];

                if (_list.length < this.pageSize || this.page == 3) {
                    // 所有数据加载完毕
                    window.$vm.$emit('vmui.infinitescroll.loadedAll');
                    return;
                }

                // 单次请求数据完毕
                window.$vm.$emit('vmui.infinitescroll.loadedOnce');

                this.page ++;

                /* 返回定位demo
                if (this.pagename) {
                    sessionStorage[`${this.pagename}_page`] = this.cur
                    // 缓存本页之前数据
                    sessionStorage[`${this.pagename}_data`] = JSON.stringify(this.list)
                    // 缓存顶部距离
                    sessionStorage[`${this.pagename}_scrollTop`] = this.scrollTop
                    // 如果数据更新, 清除缓存
                    if (true) {
                        sessionStorage.removeItem(`${this.pagename}_page`)
                        sessionStorage.removeItem(`${this.pagename}_data`)
                        sessionStorage.removeItem(`${this.pagename}_scrollTop`)
                    }
                }
                */
            });
        }
    }
}
</script>
