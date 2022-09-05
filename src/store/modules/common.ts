interface IState {
  menuCollapse: boolean;
  isTokenTimeout: boolean;
}

export default {
  namespace: true,
  state: {
    menuCollapse: false,
    isTokenTimeout: false,
  },
  mutations: {
    changeMenuCollapse(state: IState, payload: boolean) {
      state.menuCollapse = payload;
    },
    changeIsTokenTimeout(state: IState, payload: boolean) {
      state.isTokenTimeout = payload;
    },
  },
  actions: {},
};
