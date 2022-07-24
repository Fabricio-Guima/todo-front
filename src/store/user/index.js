export default {
  namespaced: true,

  state: () => ({
    user: {},
    userLogged: false,
    teste: {
      measures: [
        
      ]
    }
  }),
  
  mutations: {
    STORE_USER(state, payload) {     
      state.user = payload;
    },
   
    STORE_POSTS(state, payload) {
      state.teste.measures = payload
    },

    STORE_USER_LOGGED(state, payload) {     
      state.userLogged = payload
    }
  },

  actions: {
    getPostsBack(context, payload) {
      context.commit('STORE_POSTS', payload)
    }
  }
};
