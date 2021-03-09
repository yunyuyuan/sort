<template>
  <div class="select">
    <div class="canvas">
      <span v-for="i in list" class="column"
            :style="calcStyle(i)"
            :class="{active: i.active, finish: i.finish}"></span>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "@vue/reactivity";

export default {
  name: "index",
  data (){
    return {
    }
  },
  setup (){
    const store = useStore();
    return {
      list: computed(()=>store.state.list),
      duration: computed(()=>store.state.duration),
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
    }
  }
}
</script>

<style scoped lang="scss">
.select{
  >.canvas{
    >.column{
    }
  }
}
</style>