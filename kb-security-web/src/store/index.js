import Vue from 'vue'
import Vuex from 'vuex'

import main from './main'
import user from './user'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    main,
    user
  },
});

export default store
