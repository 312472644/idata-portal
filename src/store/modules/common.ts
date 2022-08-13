export default {
  namespace: true,
  state: {
    navList: [],
    title: 'roleName',
  },
  mutations: {
    changeNavList(state: any, payload: any) {
      state.title = payload;
    },
  },
  actions: {},
};
