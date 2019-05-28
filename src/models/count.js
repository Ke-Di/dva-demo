export default {
  namespace: "count",

  state: {
    record: 0,
    current: 0
  },

  reducers: {
    add(state, payload) {
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent
      };
    },
    minus(state) {
      return { ...state, current: state.current - 1 };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

  effects: {
    *add(action, { call, put }) {
      yield call(delay, 2000);
      yield put({ type: "minus" });
    },
    *fetch({ payload }, { call, put }) {
      yield put({ type: "save" });
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  }
};

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
