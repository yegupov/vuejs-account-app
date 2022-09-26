export default {
  namespaced: true,

  state: {
    users: [],
    loggedUser: null
  },

  getters: {
    allUsers : state => {
      return state.users;
    },

    loggedUser : state => {
      return state.loggedUser;
    }
  },

  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      console.log('Users list => ',state.users);
    },

    SET_LOGGEDUSER(state, user) {
      state.loggedUser = user;
    },

    CLEAR_LOGGEDUSER(state) {
      state.loggedUser = null
    }
  },

  actions: {

    async fetchUsers({ commit }) {
      try {
        const {data} = await this.$axios.get("http://localhost:3000/users");

        commit("SET_USERS", data);
      } catch (error) {
        console.log('ERROR => ', 'Failed to get users');
      }
    },

    setLoggedUser({ commit }, loggedUser) {
      commit("SET_LOGGEDUSER", loggedUser);
    },

    logout({ commit }) {
      commit("CLEAR_LOGGEDUSER");
    }
  }

};
