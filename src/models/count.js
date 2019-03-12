// import key from "keymaster";

export default {
  namespace: "count",

  state: {
    record: 0,
    current: 0
  },

  reducers: {
    add(state, payload) {
      console.log("add state:", state);
      console.log("add payload:", payload);
      const newCurrent = state.current + 1;
      return {
        ...state,
        record: newCurrent > state.record ? newCurrent : state.record,
        current: newCurrent
      };
    },
    minus(state) {
      console.log("minus state:", state);
      return { ...state, current: state.current - 1 };
    },
    save(state, action) {
      return { ...state, ...action.payload };
    }
  },

  effects: {
    *add(action, { call, put }) {
      console.log("effects add:");
      yield call(delay, 2000);
      yield put({ type: "minus" });
    },
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: "save" });
    }
  },

  subscriptions: {
    // keyboardWatcher({ dispatch }) {
    //   key("⌘+up, ctrl+up", () => {
    //     dispatch({ type: "add" });
    //   });
    // },
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  }
};

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
