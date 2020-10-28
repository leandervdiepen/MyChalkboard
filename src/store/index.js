import { createStore } from 'vuex'

export default createStore({
  state: {
    isSelected: 1
  },
  mutations: {
    setSelected(state,num){
      state.isSelected = num;
    }
  },
  actions: {
  },
  modules: {
  }
})
