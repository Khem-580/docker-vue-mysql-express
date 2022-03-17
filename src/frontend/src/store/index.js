import Vue from "vue";
import Vuex from "vuex";
import { ToastProgrammatic as Toast } from 'buefy';
import { debounce } from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: 'Join Smith'
  },
  mutations: {
    SET_USERNAME (state, payload) {
      state.username = payload;
    }
  },
  actions: {
    setUsername: debounce((context, username) => {
      context.commit('SET_USERNAME', username);
      Toast.open({
        message: 'New name is set!',
        type: 'is-success',
        position: 'is-bottom'
      })
    }, 1000),
  },
  modules: {},
});
