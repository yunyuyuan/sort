<template>
  <div class="select">
    <div class="canvas">
      <span v-for="i in list" class="column"
            :style="calcStyle(i)"
            :class="{active: i.active||first===i.sort, finish: i.finish, running: i.running}">
          <svg-icon v-if="active===i.sort" name="arrow"/>
      </span>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, reactive} from "@vue/reactivity";
import {sleep} from "@/utils/sleep";

export default {
  name: "index",
  data (){
    return {
      active: -1,
      first: -1
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
      this.active = 0;
      for (let i=0;i<this.list.length-1;i++){
        const itemStart = this.list.find(v=>v.sort===i)
        this.first = itemStart.sort;
        itemStart.running = true;
        await sleep(this.duration);
        this.active = i;
        for (let j=i+1;j<this.list.length;j++){
          const itemNow = this.list.find(v=>v.sort===j);
          if (itemNow.finish) continue
          itemNow.active = true;
          await sleep(this.duration);
          const itemFirst = this.list.find(v=>v.sort===this.first);
          if (itemNow.num<itemFirst.num){
            itemFirst.running = false;
            itemNow.active = false;
            itemNow.running = true;
            this.first = itemNow.sort;
            await sleep(this.duration);
          }else{
            itemNow.active = false;
          }
        }
        const item = this.list.find(v=>v.sort===this.first);
        this.active = i+1;
        if (this.first !== itemStart.sort){
          itemStart.active = true;
          await sleep(this.duration);
          const tmp = itemStart.sort;
          itemStart.sort = this.first;
          item.sort = tmp;
          await sleep(this.duration);
        }
        item.finish = true;
        await sleep(this.duration);
        itemStart.active = false;
        item.running = false;
        item.active = false;
      }
      this.active = -1;
      for (const i of this.list){
        i.finish = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.select{
  >.canvas{
    >.column{
      transition: left 500ms linear;
    }
  }
}
</style>