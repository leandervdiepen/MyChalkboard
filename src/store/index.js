import { createStore } from 'vuex'

export default createStore({
  state: {
    isSelected: 1, // 1=Courses, 2=Todo, 3=Kalender
    user: null
  },
  actions: {
    changeSelected({ commit }, num) {
      commit("setSelected", num)
    },
    userLoggedIn({ commit }, data) {
      commit("setUser", data)
    }
  },
  mutations: {
    setSelected(state, num) {
      state.isSelected = num;
    },
    setUser(state, data) {
      state.user = data
    }
  },
  modules: {
  }
})
