
export default {
    namespace: 'host',
    state: {},
    reducers: {
        'delete'(state, { payload: _id }) {
            return {data:state.data.filter(item => item._id !== _id),page:state.page,hostVisible:state.hostVisible,isEdit:state.isEdit,modelVisible:state.modelVisible};
        },
        'add'(state, { addhost:data }) {
            return {data:[data,...state.data],page:state.page,hostVisible:state.hostVisible,isEdit:state.isEdit,modelVisible:state.modelVisible}
        },
        'edit'(state, { edithost:data }) {
          const newData = [...state.data];
          const index = newData.findIndex(item => data._id === item._id);
          newData[index] = data;
          return {data:newData,page:state.page,hostVisible:state.hostVisible,isEdit:state.isEdit,modelVisible:state.modelVisible}
        },
        'toggleVisible'(state, { hostVisible:data }) {
            return {data:[...state.data],page:state.page,hostVisible:!state.hostVisible,isEdit:state.isEdit,modelVisible:state.modelVisible}
        },
        'modelVisible'(state, { payload: show }) {
          return {data:[...state.data],page:state.page,hostVisible:state.hostVisible,isEdit:state.isEdit,modelVisible:show};
        },
        'getlist'(state,{data,page}) {

          return {data:data,page:page,hostVisible:state.hostVisible,isEdit:state.isEdit,modelVisible:state.modelVisible};
        },
        'isEdit'(state,{isEdit}) {

          return {data:state.data,page:state.page,hostVisible:state.hostVisible,isEdit:isEdit,modelVisible:state.modelVisible};
      },
    },
};
