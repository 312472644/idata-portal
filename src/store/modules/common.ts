interface IState {
  menuCollapse: boolean;
  title: string;
}

export default {
  namespace: true,
  state: {
    menuCollapse: false,
    title: 'roleName',
  },
  mutations: {
    changeNavList(state: IState, payload: any) {
      state.title = payload;
    },
    changeMenuCollapse(state: IState, payload: boolean) {
      state.menuCollapse = payload;
    },
  },
  actions: {},
};
