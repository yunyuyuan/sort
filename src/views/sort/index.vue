<template>
  <div class="sort">
    <div class="links">
      <router-link v-for="i in sortMethods" :to="{name: 'sort-'+i}">{{ i }}</router-link>
    </div>
    <single-button @click="genData">gen data</single-button>
    <router-view v-slot="{ Component }">
        <component class="main" ref="sorter" :is="Component" :style="{width: width+85+'px',padding: '10px 40px 10px 40px'}"/>
    </router-view>
    <single-button @click="doit">do it</single-button>
  </div>
</template>

<script>
import SingleButton from "@/views/components/single-button";
import {useStore} from "vuex";
import {computed} from "@vue/reactivity";
import {methods} from "@/route";

export default {
  name: "index",
  components: {SingleButton},
  data (){
    return {
      sortMethods: methods
    }
  },
  setup() {
    const store = useStore()
    return {
      genData: ()=>store.commit('genData'),
      width: computed(()=>(store.state.len-1)*50)
    }
  },
  methods: {
    doit (){
      this.$refs.sorter.doit()
    }
  }
}
</script>

<style scoped lang="scss">
.sort{
  >.links{
    display: flex;
    >a{
      border-radius: 4px;
      margin: 5px 15px;
      color: black;
      background: #e7e7e7;
      border: 1px solid #b1b1b1;
      font-size: 15px;
      text-decoration: none;
      padding: 5px 10px;
      transition: all .15s ease-out;
      &:active{
        background: #ffe6c0;
      }
      &:not(.router-link-active):hover{
        border-color: #616161;
      }
      &.router-link-active{
        background: #9f00ff;
        color: white;
        border-color: white;
      }
    }
  }
  ::v-deep >.main{
    border: 1px solid gray;
    .canvas {
      height: 400px;
      position: relative;

      > .column {
        position: absolute;
        width: 45px;
        bottom: 0;
        background: #4db2ff;
        border-radius: 5px 5px 0 0;

        &.active {
          background: green;
        }

        &.finish {
          background: #ff8737;
        }
        &.running {
          background: #ff23a6;
        }
        >svg{
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(calc(-100% - 10px));
          width: 20px;
          height: 20px;
          fill: red;
        }
      }
    }
  }
}
</style>