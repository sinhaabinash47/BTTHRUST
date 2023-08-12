import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      formData: {},

    };
  },
  getters: {},
  mutations: {
    updateData(state, payload) {
      const allUser = localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")) : []
      const data = [...allUser, payload]
      localStorage.setItem("formData", JSON.stringify(data));
    },
    updatestoreonlogin(state, payload){
      console.log( "updatestoreonlogin => ", { payload });
      state.formData = {}
      state.formData = {...payload}
    },
    logout(state,payload) {
      state.formData = {}
    }
  },
  actions: {},
  modules: {},
});
