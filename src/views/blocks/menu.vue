<template>
  <nav>
    <div class="tabs" :style="{background: bgColor}" flex>
      <div class="inner" flex>
        <router-link v-for="item in tabs" :title="item.name" :to="item.url" :exact-active-class="'active'" flex>
          <icon-svg :name="item.icon"/>
          <div class="bg" :style="{background: item.bg}"></div>
        </router-link>
        <svg :style="{top: `${activeIndex*100/tabs.length}%`}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 24.5 104.339">
          <path :fill="bgColor" d="M0+104.339C9.34126e-07+84.6504+24.477+74.5028+24.477+51.9525C24.477+30.7031+4.10275e-06+17.8668+4.95045e-06-5.2083e-06L0+104.339Z"/>
        </svg>
      </div>
    </div>
  </nav>
</template>

<script>
import IconSvg from "@/icons/IconSvg";

export default {
  name: "the-menu",
  components: {IconSvg},
  data() {
    return {
      activeTab: '首页',
      tabs: [
        {
          name: '首页',
          icon: 'fight',
          url: '/',
          bg: '#fff'
        },
        {
          name: '日历表',
          icon: 'tab-want',
          url: '/want-do',
          bg: '#bbd9ff'
        },
        {
          name: '打卡表',
          icon: 'tab-need',
          url: '/need-do',
          bg: '#9fffd7'
        },
        {
          name: '正在做',
          icon: 'tab-doing',
          url: '/doing',
          bg: '#e3c9ff'
        },
        {
          name: '设置项',
          icon: 'tab-settings',
          url: '/settings',
          bg: '#fff7cc'
        }
      ],
      bgColor: '#2f3542'
    }
  },
  created() {
  },
  computed: {
    tabNow() {
      return this.$route.path
    },
    activeIndex() {
      const index = this.tabs.findIndex(e => e.url === this.tabNow);
      if (index > -1) {
        return index
      }
    }
  }
}
</script>

<style scoped lang="scss">
nav{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  > .tabs{
    border-radius: 0 .4rem .4rem 0;
    padding: .8rem 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, .5);
    > .inner{
      flex-direction: column;
      position: relative;
      overflow: visible;
      > a, > a > .bg, > svg{
        transition: all .25s ease-out;
      }
      > a{
        width: 4rem;
        height: 4rem;
        justify-content: center;
        position: relative;
        transform: translateX(0);
        z-index: 2;
        > svg{
          width: 1.6rem;
          height: 1.6rem;
          fill: white;
          z-index: 2;
        }
        > .bg{
          position: absolute;
          width: 0;
          height: 0;
          border-radius: 50%;
          z-index: 0;
        }
        &.active{
          transform: translateX(.3rem);
          > svg{
            width: 2rem;
            height: 2rem;
            fill: black;
          }
          >.bg{
            width: 80%;
            height: 80%;
          }
        }
      }
      > svg{
        position: absolute;
        top: 0;
        right: 0;
        height: 5rem;
        z-index: 1;
        transform: translateX(calc(100% - 1px)) translateY(-0.5rem);
      }
    }
  }
}
</style>