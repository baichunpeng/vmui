<template>
    <router-link class="grids-item" :to="link || ''">
        <div class="grids-icon" v-if="checkIcon">
            <slot name="icon"></slot>
        </div>
        <div class="grids-txt" v-if="checkText">
            <slot name="text"></slot>
        </div>
    </router-link>
</template>

<script type="text/babel">
    export default {
        name: 'vm-grids-item',
        props: {
            link: String
        },
        computed: {
            checkIcon() {
                return !!this.$slots.icon;
            },
            checkText() {
                return !!this.$slots.text;
            }
        }
    }
</script>

<style lang="less">
@import "../../../styles/common/variables";
@import "../../../styles/common/mixins";

.m-grids() {
  overflow: hidden;
  position: relative;
  background-color: @grids-bg;
  &:before {
    .bottom-line(@grids-line-high-color, 1);
  }
}

.m-grids-2 {
  .m-grids();
  .grids-item {
    width: 50%;
    &:not(:nth-child(2n)):before {
      .right-line(@grids-line-color);
    }
  }
}

.m-grids-3 {
  .m-grids();
  .grids-item {
    width: 33.333333%;
    &:not(:nth-child(3n)):before {
      .right-line(@grids-line-color);
    }
  }
}

.m-grids-4 {
  .m-grids();
  .grids-item {
    width: 25%;
    &:not(:nth-child(4n)):before {
      .right-line(@grids-line-color);
    }
  }
}

.m-grids-5 {
  .m-grids();
  .grids-item {
    width: 20%;
    &:not(:nth-child(5n)):before {
      .right-line(@grids-line-color);
    }
  }
}

.grids-item {
  width: 25%;
  float: left;
  position: relative;
  z-index: 0;
  padding: @grids-padding-horizontal 0;
  font-size: @grids-fontsize;
  &:after {
    .bottom-line(@grids-line-color);
  }
}

.grids-icon {
  height: .68rem*@suiremscale;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    &:after, &:before {
        font-size: .54rem*@suiremscale;
    }
  }
  img {
    height: 70%;
  }
}

.grids-txt {
  .text-overflow(center);
  color: @grids-color;
  padding: 0 .2rem*@suiremscale;
}

.m-gridstitle {
  padding: .15rem*@suiremscale + .2rem*@suiremscale @body-padding-vertical .1rem*@suiremscale;
  font-size: @cell-title-fontsize;
  text-align: left;
  color: @cell-title-color;
  position: relative;
  z-index: 1;
  background-color: @body-bg;
  &:after {
    .bottom-line(@line-color, 3);
  }
}
</style>
