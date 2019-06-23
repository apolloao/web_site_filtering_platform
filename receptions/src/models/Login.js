
export default {
    namespace: 'loginData',
    state: {},
    reducers: {
        'model'(state, { payload: show }) {
          // state.show = show;
            return {show:show};
        },

    },
};
