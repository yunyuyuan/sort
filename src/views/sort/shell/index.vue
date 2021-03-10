<template>
  <div class="shell">
    <div class="canvas">
      <span v-for="i in list" class="column"
            :style="calcStyle(i)"
            :class="{active: i.active, finish: i.finish}">
        <svg-icon v-if="end===i.sort" name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
import {sleep} from "@/utils/sleep";
import {useStore} from "vuex";
import {computed, reactive} from "@vue/reactivity";

export default {
  name: "index",
  data (){
    return {
      end: -1,
    }
  },
  setup (){
    const store = useStore();
    return {
      list: computed(()=>store.state.list),
      duration: reactive(computed(()=>store.state.duration)),
    }
  },
  methods: {
    calcStyle (i){
      return {
        height: i.num*4+'px',
        left: 50*i.sort+'px',
        transitionDuration: this.duration+'ms'
      }
    },
    async doit (){
      for (const i of this.list){
        i.finish = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.shell{
  >.canvas{
    >.column{
      transition: left 500ms linear;
      display: flex;
      align-items: center;
    }
  }
}
</style>