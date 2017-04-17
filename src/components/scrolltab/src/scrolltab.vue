<template>
    <div class="vm-scrolltab">
        <div class="vm-scrolltab-nav">
            <a href="javascript:;" class="vm-scrolltab-item"
               v-for="item in navList"
               :class="activeIndex == item._uid ? 'vm-scrolltab-active' : ''"
               @click="moveHandler(item._uid)">
                <div class="vm-scrolltab-icon"><i :class="item.icon"></i></div>
                <div class="vm-scrolltab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="vm-scrolltab-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vm-scrolltab',

    data() {
        return {
            scrolling: false,
            navList: [],
            activeIndex: 0,
            timer: null
        }
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            this.scrollView = this.$refs.scrollView;

            this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

            this.bindEvent();

            this.setDefault();
        },

        getPanels() {
            return this.$children.filter(item => item.$options.name === 'vm-scrolltab-panel');
        },

        bindEvent() {
            this.scrollView.addEventListener('scroll', this.scrollHandler);
            window.addEventListener('resize', this.scrollHandler);
        },

        setDefault() {
            const panels = this.getPanels();

            let num = 0;

            panels.forEach((panel) => {
                this.navList.push({
                    label: panel.label,
                    _uid: panel._uid,
                    icon: panel.icon
                });
                if (panel.active) {
                    this.activeIndex = panel._uid;
                    this.moveHandler(panel._uid);
                } else {
                    ++num;
                    if (num >= panels.length)
                        this.activeIndex = panels[0]._uid;
                }
            });
        },

        moveHandler(uid) {
            if (this.scrolling)return;
            this.scrolling = true;

            const panels = this.getPanels();
            const itemOffsetTop = panels.filter(item => item._uid == uid)[0].$el.getBoundingClientRect().top;

            this.scrollView.scrollTop = itemOffsetTop + this.scrollView.scrollTop - this.contentOffsetTop + 2;
            this.activeIndex = uid;

            setTimeout(() => {
                this.scrolling = false;
            }, 6);
        },

        scrollHandler() {
            if (this.scrolling)return;

            const panels = this.getPanels();
            const panelsLength = panels.length;
            const scrollBox = this.scrollView;
            const scrollBoxHeight = scrollBox.offsetHeight;
            const scrollBoxTop = scrollBox.scrollTop;
            const panelItemHeight = panels[0].$el.offsetHeight;

            if (scrollBoxTop >= panelItemHeight * panelsLength - scrollBoxHeight) {
                this.activeIndex = panels[panelsLength - 1]._uid;
                return;
            }

            panels.forEach((panel) => {
                if (panel.$el.getBoundingClientRect().top <= this.contentOffsetTop) {
                    this.activeIndex = panel._uid;
                }
            });
        }
    },

    destroyed() {
        this.scrollView.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.scrollHandler);
    }
}
</script>

<style lang="less">
@import "../../../styles/variables";
@import "../../../styles/mixins";

.vm-scrolltab {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
}

.vm-scrolltab-nav {
	height: 100%;
	background-color: #F5F5F5;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	position: relative;
	z-index: 1;
	&:after {
		.right-line(#DFDFDF);
	}
}

.vm-scrolltab-item {
	padding: 0 .3rem*@suiremscale;
	height: 1rem*@suiremscale;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	&.vm-scrolltab-active {
		background-color: #FFF;
		&:before {
			.right-line(#FFF);
		}
		&:active {
			background-color: #FFF;
		}
	}
	&:after {
		.bottom-line(#DFDFDF);
	}
	&:before {
		.right-line(#DFDFDF);
	}
	&:active {
		background: none; /* for firefox */
	}
}

.vm-scrolltab-icon {
	margin-right: .2rem*@suiremscale;
	font-size: .32rem*@suiremscale;
	display: flex;
	align-items: center;
	justify-content: center;
	> img {
		height: .4rem*@suiremscale;
		display: inline-block;
	}
}

.vm-scrolltab-title {
	font-size: .3rem*@suiremscale;
	color: #666;
	overflow-x: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 1.6rem*@suiremscale;
}

.vm-scrolltab-content {
	height: 100%;
	background-color: #FFF;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	flex: 1;
	padding: 0 .24rem*@suiremscale .24rem*@suiremscale .24rem*@suiremscale;
	position: relative;
}

.vm-scrolltab-content-title {
	font-size: .3rem*@suiremscale;
	font-weight: normal;
	color: #555;
	display: block;
	padding-bottom: .1rem*@suiremscale;
	padding-top: .32rem*@suiremscale;
	margin-bottom: .2rem*@suiremscale;
	position: relative;
	z-index: 1;
	&:after {
		.bottom-line(@line-high-color);
	}
}
</style>
