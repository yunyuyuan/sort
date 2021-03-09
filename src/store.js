import {createStore} from 'vuex'
import {random} from "@/utils/random";

export default createStore({
  state: {
    list: [],
    len: 10,
    duration: 200
  },
  mutations: {
    genData(state){
      state.list = []
      for (let i=0;i<state.len;i++){
        state.list.push({sort: i, num: random(), active: false, finish: false, running: false})
      }
    }
  },
  getters: {

  }
})