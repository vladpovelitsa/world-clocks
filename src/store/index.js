import Vue from "vue";
import Vuex from "vuex";
import clocks from './modules/clocks.js';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    clocks,
  },
});
