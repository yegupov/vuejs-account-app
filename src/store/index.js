import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";  // https://codesandbox.io/s/f9hxw
import users from "./modules/users"
import tooltip from "./modules/tooltip"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    tooltip
  },
  plugins: [
    createPersistedState({
      paths: ["users", "tooltip"]
    })
  ]
});
