import React from 'react';
import { connect } from 'dva';
import Host from '../components/Host';
import { hostList } from '../api/host';
import { BackTop } from 'antd';

const Hosts = ({ dispatch,  host }) => {
  //初始化获取list数据
    function handleGetList(params) {
      let data = {
        ...params,
        ...params.order
      };
      delete data.order;
      hostList(data).then((res)=>{
        dispatch({
          type: 'host/getlist',
          data:res.data,
          page:{
            total:res.total,
            pageIndex:res.currPage,
            pageSize:params.pageSize,
            order:params.order
          }
        });
      }).catch((res)=>{

      });

    }
    function handleDelete(id,text) {
        dispatch({
            type: 'host/delete',
            payload: id,
        });
    }
    function handleAdd() {
        handleModel(null)
    }
    function handleSubmit(data,bol) {
        handleModel(null);
        if(bol){
          dispatch({
            type: 'host/edit',
            edithost: data,
          });
        }else{
          dispatch({
            type: 'host/add',
            addhost: data,
          });
        }

    }
    function handleModel(data) {
        dispatch({
            type: 'host/toggleVisible',
            toggleVisible: data,
        });
    }
  function handleEdit(data) {
    dispatch({
      type: 'host/isEdit',
      isEdit: data,
    });
  }
  function handlemodelShow(data) {
    dispatch({
      type: 'host/modelVisible',
      payload: true,
    });
  }
    return (
        <div className="host_wrap">
            <Host
              onDelete={handleDelete}
              host={host}
              onAdd={handleAdd}
              onHandleModel = {handleModel}
              onSubmit={ handleSubmit }
              onhandleGetList = {handleGetList}
              onhandleEdit ={handleEdit}
              onhandlemodelShow = {handlemodelShow}
            />
          <div>
            <BackTop />
          </div>
        </div>
    );
};

export default connect(({ host }) => ({
    host
}))(Hosts);
