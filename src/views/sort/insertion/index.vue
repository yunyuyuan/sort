<template>
  <div class="insertion">
    <div class="canvas">
      <span v-for="i in list" class="column"
            :style="calcStyle(i)"
            :class="{active: i.active,running: i.running, finish: i.finish}">
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
      for (let i=1;i<this.list.length;i++){
        this.end = i+1;
        const itemNow = this.list.find(v=>v.sort===i);
        itemNow.running = true;
        await sleep(this.duration);
        let ok = false;
        for (let j=i-1;j>=0;j--){
          const itemCompare = this.list.find(v=>v.sort===j);
          itemCompare.finish = false;
          itemCompare.active = true;
          await sleep(this.duration);
          if (itemNow.num > itemCompare.num){
            itemNow.running = false;
            itemCompare.active = false;
            itemNow.finish = true;
            itemCompare.finish = true;
            ok = true;
            break;
          }else{
            const tmp = itemNow.sort;
            itemNow.sort = itemCompare.sort;
            itemCompare.sort = tmp;
            itemCompare.finish = true;
            await sleep(this.duration*3/2);
          }
        }
        if (!ok){
          itemNow.finish = true;
          itemNow.running = false;
        }
      }
      this.end = -1
      for (const i of this.list){
        i.finish = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.insertion{
  >.canvas{
    >.column{
      transition: left 500ms linear;
      display: flex;
      align-items: center;
    }
  }
}
</style>