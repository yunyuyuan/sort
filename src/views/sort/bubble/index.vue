<template>
  <div class="bubble">
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
      method: 2,
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
      const list = this.list.map(v=>v.num);
      switch (this.method){
        case 1:
          for (let i=0;i<list.length-1;i++){
            for (let j=0;j<list.length-i-1;j++){
              const a = list[j];
              const b = list[j+1];
              const sortJ = this.list.findIndex(v=>v.sort===j);
              const sortJAdd = this.list.findIndex(v=>v.sort===j+1);
              this.list[sortJAdd].active = true;
              this.list[sortJ].active = true;
              await sleep(this.duration/2)
              if (a>b) {
                list.splice(j, 2, b, a);
                // 改变sort
                const tmp = this.list[sortJAdd].sort
                this.list[sortJAdd].sort = this.list[sortJ].sort;
                this.list[sortJ].sort = tmp;
                await sleep(this.duration);
                this.list[sortJAdd].active = false;
              }else{
                await sleep(this.duration/2);
                this.list[sortJ].active = false;
              }
              await sleep(this.duration/2)
            }
            this.list.find(v=>v.sort===list.length-i-1).finish = true;
          }
          break;
        case 2:
          this.end = this.list.length-1;
          let last = this.end;
          let hasDo;
          do {
            hasDo = false;
            for (let j=0;j<this.end;j++){
              const a = list[j];
              const b = list[j+1];
              const sortJ = this.list.findIndex(v=>v.sort===j);
              const sortJAdd = this.list.findIndex(v=>v.sort===j+1);
              this.list[sortJAdd].active = true;
              this.list[sortJ].active = true;
              await sleep(this.duration/2)
              if (a>b) {
                list.splice(j, 2, b, a);
                // 改变sort
                const tmp = this.list[sortJAdd].sort
                this.list[sortJAdd].sort = this.list[sortJ].sort;
                this.list[sortJ].sort = tmp;
                last = j;
                hasDo = true;
                if (this.end === tmp){
                  this.end = this.list[sortJAdd].sort
                }
                await sleep(this.duration)
                this.list[sortJAdd].active = false;
              }else{
                await sleep(this.duration/2);
                this.list[sortJ].active = false;
              }
              await sleep(this.duration/2)
            }
            this.end = hasDo?last:this.end-1;
            for (let i=this.end+1;i<list.length;i++){
              this.list.find(v=>v.sort===i).finish = true;
            }
          } while (this.end>0&&hasDo);
          this.end = -1;
          break
      }
      for (const i of this.list){
        i.finish = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bubble{
  >.canvas{
    >.column{
      transition: left 500ms linear;
      display: flex;
      align-items: center;
    }
  }
}
</style>