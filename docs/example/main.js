import Vue from 'vue';
import VueRouter from 'vue-router';
import Resource from 'vue-resource';
// 开发版本
import VMUI from '../../src/vmui.js';
// 产出版本
// import VMUI from '../../dist/vmui.js';
// import '../../dist/vmui.rem.css';

import '../../src/vmui.flexible.js';

import Index from './routers/index.vue';
import Button from './routers/button.vue';
import Dialog from './routers/dialog.vue';
import Cell from './routers/cell.vue';
import Grids from './routers/grids.vue';
import Icons from './routers/icons.vue';
import List from './routers/list.vue';
import ListTheme from './routers/list.theme.vue';
import Infinitescroll from './routers/infinitescroll.vue';
import PullRefresh from './routers/pullrefresh.vue';
import Badge from './routers/badge.vue';
import TabBar from './routers/tabbar.vue';
import NavBar from './routers/navbar.vue';
import Tabs from './routers/tabs.vue';
import Tab from './routers/tab.vue';
import ScrollTab from './routers/scrolltab.vue';
import ActionSheet from './routers/actionsheet.vue';
import SendCode from './routers/sendcode.vue';
import ProgressBar from './routers/progressbar.vue';
import KeyBoard from './routers/keyboard.vue';
import Slider from './routers/slider.vue';
import Spinner from './routers/spinner.vue';
import CitySelect from './routers/cityselect.vue';
import LazyImg from './routers/lazyimg.vue';
import CountDown from './routers/countdown.vue';
import Rate from './routers/rate.vue';
import Popup from './routers/popup.vue';
import CountUp from './routers/countup.vue';
import BackTop from './routers/backtop.vue';
import Layout from './routers/layout.vue';
import Utils from './routers/utils.vue';
import Filters from './routers/filters.vue';
import Share from './routers/share.vue';
import Clip from './routers/clip.vue';

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Resource);
Vue.use(VMUI);

document.addEventListener('DOMContentLoaded', function () {
	typeof FastClick == 'function' && FastClick.attach(document.body);
}, false);

const router = new VueRouter({
	routes: [
		{path: '/', component: Index},
		{path: '/button', component: Button},
		{path: '/dialog', component: Dialog},
		{path: '/cell', component: Cell},
		{path: '/grids', component: Grids},
		{path: '/icons', component: Icons},
		{path: '/list', component: List},
		{path: '/list.theme/:id', component: ListTheme},
		{path: '/infinitescroll', component: Infinitescroll},
		{path: '/pullrefresh', component: PullRefresh},
		{path: '/badge', component: Badge},
		{path: '/navbar', component: NavBar},
		{path: '/tabbar', component: TabBar},
		{path: '/tabbar', component: TabBar},
		{path: '/navbar', component: NavBar},
		{path: '/tabs', component: Tabs},
		{path: '/tab', component: Tab},
		{path: '/scrolltab', component: ScrollTab},
		{path: '/actionsheet', component: ActionSheet},
		{path: '/sendcode', component: SendCode},
		{path: '/progressbar', component: ProgressBar},
		{path: '/keyboard', component: KeyBoard},
		{path: '/slider', component: Slider},
		{path: '/spinner', component: Spinner},
		{path: '/cityselect', component: CitySelect},
		{path: '/lazyimg', component: LazyImg},
		{path: '/countdown', component: CountDown},
		{path: '/rate', component: Rate},
		{path: '/popup', component: Popup},
		{path: '/countup', component: CountUp},
		{path: '/backtop', component: BackTop},
		{path: '/layout', component: Layout},
		{path: '/utils', component: Utils},
		{path: '/filters', component: Filters},
		{path: '/share', component: Share},
		{path: '/clip', component: Clip},
	]
});

const app = new Vue({
	router: router,
	render: v => v(App)
}).$mount('#app');

// fix ios wechat webview scroll bug
(() => {
	let lastY	//最后一次y坐标点

	document.body.addEventListener('touchstart', event => {
		// 点击屏幕时记录最后一次Y度坐标
		lastY = event.changedTouches[0].clientY
	}, false)

	document.body.addEventListener('touchmove', event => {
		let y = event.changedTouches[0].clientY,
			$scrollview = document.querySelector('.vm-scrollview')

		let st = $scrollview.scrollTop		// 已滚动高度
		let sh = $scrollview.scrollHeight  	// 滚动区总高度
		let ch = $scrollview.clientHeight  	// 滚动区可见高度

		// 如果到顶/到底了，且是下拉/上拉情况下，阻止touchmove事件
		if ((y >= lastY && st <= 10) || (y <= lastY && sh-st-ch <= 10)) {
			lastY = y
			event.preventDefault()
		}
		lastY = y
	}, false)
})()