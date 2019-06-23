import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm , Input , Button , Form , Modal,message ,Pagination,Row,Col ,Select} from 'antd';
import { hostSave , hostDelete } from '../api/host';
import Login from './Login';
import { formatDate } from '../utils/tools';

const HostList = ({ onDelete, host , onAdd, onHandleModel ,onSubmit ,onhandleGetList , onhandleEdit ,onhandlemodelShow}) => {
  const onDeleted = (_id,text)=>{
    if(localStorage.getItem('login')){
      hostDelete({id:_id,status:0}).then((res)=>{
        message.success('删除成功！');

        onDelete(_id,text)

      }).catch((res)=>{
        console.log(res)
      });
    }else{
      onhandlemodelShow();
    }

    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        })
    };
    let editable = false;
    const columns = [{
        title: 'ID',
        dataIndex: '_id',
        editable: editable,
        sorter: (a, b) => a._id - b._id,
    },{
      title: '父级分类',
      dataIndex: 'type1',
      editable: editable,
      sorter: (a, b) => a.type1 - b.type1,
    },{
      title: '分类',
      dataIndex: 'type2',
      editable: editable,
      sorter: (a, b) => a.type2 - b.type2,
    },{
      title: '名称',
      dataIndex: 'name',
      editable: editable,
      sorter: (a, b) => a.name - b.name,
    },{
      title: '类型',
      dataIndex: 'type',
      editable: editable,
      sorter: (a, b) => a.type - b.type,
    },{
      title: '备注',
      dataIndex: 'label',
      editable: editable,
      sorter: (a, b) => a.label - b.label,
    },{
      title: 'host',
      dataIndex: 'host',
      editable: editable,
      sorter: (a, b) => a.host - b.host,
    },{
      title: 'ip',
      dataIndex: 'ip',
      editable: editable,
      sorter: (a, b) => a.ip - b.ip,
    },{
      title: '创建时间',
      dataIndex: 'createTime',
      editable: editable,
      sorter: (a, b) => a.createTime - b.createTime,
      render:(text,record)=>{
        return (
          <div>
            {formatDate(new Date(parseInt(record.createTime,10)))}
          </div>
        )
      }
    },

      {
        title: '操作',
        width:220,
        render: (text , record) => {

            return (
            <div>

              <Button type="dashed" ghost style={{ marginRight: 8 }} onClick={() => handleAdd(record._id,text)}  icon="edit" >编辑</Button>
              {/*<Button type="dashed" ghost style={{ marginRight: 8 }} onClick={() => handleAdd(record._id,text)}  icon="pushpin">采集</Button>*/}

              <Popconfirm title="是否删除?" onConfirm={() => onDeleted(record._id,text)}>
                  <Button  ghost type="danger"  icon="delete" >删除</Button>
                </Popconfirm>
            </div>


            );
        },
    }];
    const handleAdd = (id,text) => {
        if(localStorage.getItem('login')){
          if(id){
            onhandleEdit({edit:true,_id:id,data:text});
          }else{
            onhandleEdit({edit:false,_id:0,data:{host:'',type1:'',type2:'',ip:''}})
          }
          onAdd();
        }else{
          onhandlemodelShow();
        }

    };
    const hideModal = ()=>{
        onHandleModel();
    };
    const FormItem = Form.Item;
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 18 },
        },
    };

    var saveData = {};
    const handleNumberChange = (e,type)=>{
      if(type==='type'){
        saveData[type] = e;
      }else{
        saveData[type] = e.target.value;
      }
    };
    const hideSave = ()=>{
      if(host.isEdit.edit){
        saveData = { ...saveData , ...host.isEdit.data};
        if(saveData.hasOwnProperty('ip')&&saveData.hasOwnProperty('host')&&saveData.hasOwnProperty('type1')&&saveData.hasOwnProperty('type2')&&saveData.hasOwnProperty('type')&&saveData.hasOwnProperty('name')&&saveData.hasOwnProperty('label')){
          if(saveData['ip']&&saveData['host']&&saveData['type1']&&saveData['type2']&&saveData['type']&&saveData['name']&&saveData['label']){
            let postData = {
              ...saveData,
              id:host.isEdit._id
            };
            hostSave(postData).then((res)=>{
              postData._id = postData.id;
              onSubmit(postData,true);
              message.success('编辑成功！');
            }).catch((res)=>{
            })
          }else{
            message.warning('缺少参数');

          }
        }else{
          message.warning('缺少参数');

        }
      }else{
        if(saveData.hasOwnProperty('ip')&&saveData.hasOwnProperty('host')&&saveData.hasOwnProperty('type1')&&saveData.hasOwnProperty('type2')&&saveData.hasOwnProperty('type')&&saveData.hasOwnProperty('name')&&saveData.hasOwnProperty('label')){
          if(saveData['ip']&&saveData['host']&&saveData['type1']&&saveData['type2']&&saveData['type']&&saveData['name']&&saveData['label']){

            hostSave(saveData).then((res)=>{
              onSubmit(res.data,false);
              message.success('添加成功！');
            }).catch((res)=>{
              console.log(res)
            })
          }else{
            message.warning('缺少参数');

          }
        }else{
          message.warning('缺少参数');

        }
      }

    };
    let params = {};
    const handleChange = (pagination, filters, sorter) => {
      if(sorter.field==='_id'&&sorter.order==='ascend'){
          params = {sortid:1}
      }else if(sorter.field==='_id'&&sorter.order==='descend'){
         params = {sortid:-1}
      }else if(sorter.field==='ip'&&sorter.order==='ascend'){
         params = {sortip:1}
      }else if(sorter.field==='ip'&&sorter.order==='descend'){
        params = {sortip:-1}
      }else if(sorter.field==='host'&&sorter.order==='ascend'){
        params = {sorthost:1}
      }else if(sorter.field==='host'&&sorter.order==='descend'){
        params = {sorthost:-1}
      }else if(sorter.field==='name'&&sorter.order==='ascend'){
        params = {sortname:1}
      }else if(sorter.field==='name'&&sorter.order==='descend'){
        params = {sortname:-1}
      }else if(sorter.field==='type'&&sorter.order==='ascend'){
        params = {sorttype:1}
      }else if(sorter.field==='type'&&sorter.order==='descend'){
        params = {sorttype:-1}
      }else if(sorter.field==='label'&&sorter.order==='ascend'){
        params = {sortlabel:1}
      }else if(sorter.field==='label'&&sorter.order==='descend'){
        params = {sortlabel:-1}
      }else if(sorter.field==='type1'&&sorter.order==='ascend'){
        params = {sorttype1:1}
      }else if(sorter.field==='type1'&&sorter.order==='descend'){
        params = {sorttype1:-1}
      }else if(sorter.field==='type2'&&sorter.order==='ascend'){
        params = {sorttype2:1}
      }else if(sorter.field==='type2'&&sorter.order==='descend'){
        params = {sorttype2:-1}
      }else if(sorter.field==='createTime'&&sorter.order==='ascend'){
        params = {sortcreateTime:1}
      }else if(sorter.field==='createTime'&&sorter.order==='descend'){
        params = {sortcreateTime:-1}
      }

      onhandleGetList({order:params,pageIndex:1,pageSize:host.page.pageSize})

    };
    const onShowSizeChange = (current, pageSize)=> {
      onhandleGetList({order:host.page.order,pageIndex:current,pageSize})
    };
    const onShowIndexChange = (current, pageSize)=> {
      onhandleGetList({order:host.page.order,pageIndex:current,pageSize})

    };
    const Option = Select.Option;

    return (
        <div style={{textAlign:'right'}}>
            <Login loginData={{show:false}} />
            <Button ghost icon="plus" onClick={()=>handleAdd()} type="dashed" size={'large'} style={{ marginBottom: 16,textAlign:'right' }}>
                新增
            </Button>


          <Modal
              ghost
                title="编辑/添加"
                visible={host.hostVisible}
                onOk={hideSave}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
                destroyOnClose="true"
                width="860px"
                keyboard="true"
            >
                <Form>
                    <FormItem
                      {...formItemLayout}
                      label="上级分类"
                    >
                      <Input placeholder="请输入上级分类"
                             onChange={(e)=>handleNumberChange(e,'type1')}
                             defaultValue={host.isEdit?host.isEdit.data.type1:''}

                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="分类"
                    >
                      <Input placeholder="请输入分类"
                             onChange={(e)=>handleNumberChange(e,'type2')}
                             defaultValue={host.isEdit?host.isEdit.data.type2:''}

                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="名称"
                    >
                      <Input placeholder="请输入名称"
                             onChange={(e)=>handleNumberChange(e,'name')}
                             defaultValue={host.isEdit?host.isEdit.data.name:''}
                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="备注"
                    >
                      <Input placeholder="请输入备注"
                             onChange={(e)=>handleNumberChange(e,'label')}
                             defaultValue={host.isEdit?host.isEdit.data.label:''}
                      />
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="类型"
                    >
                      {/*<Input placeholder="请输入类型"*/}
                             {/*onChange={(e)=>handleNumberChange(e,'type')}*/}
                             {/*defaultValue={host.isEdit?host.isEdit.data.type:''}*/}
                      {/*/>*/}
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="请选择类型"
                        optionFilterProp="children"
                        defaultValue={host.isEdit?host.isEdit.data.type:''}
                        onChange={(e)=>handleNumberChange(e,'type')}
                       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="web">web</Option>
                        <Option value="wap">wap</Option>
                        <Option value="app">app</Option>
                      </Select>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="host"
                    >
                        <Input placeholder="请输入host"
                           onChange={(e)=>handleNumberChange(e,'host')}
                               defaultValue={host.isEdit?host.isEdit.data.host:''}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="ip"
                    >
                        <Input placeholder="请输入ip"
                               onChange={(e)=>handleNumberChange(e,'ip')}
                               defaultValue={host.isEdit?host.isEdit.data.ip:''}

                        />
                    </FormItem>

                </Form>
            </Modal>
            <div>
              <Table
                ghost
                ClassName="table-row"
                rowClassName="table-row-diy"
                loading={!host.data.length}
                rowSelection={rowSelection}
                dataSource={host.data}
                columns={columns}
                rowKey="_id"
                bordered={true}
                onChange={handleChange}
                pagination={false}
              />
            </div>

            <Row>
              <Col span={6}>

              </Col>
              <Col span={18} style={{textAlign:'right',marginTop:'15px'}}>

                <Pagination ghost showSizeChanger onShowSizeChange={onShowSizeChange} onChange={onShowIndexChange} defaultCurrent={1} current={host.page.pageIndex} total={host.page.total} />

              </Col>
            </Row>
        </div>

    );
};

HostList.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    host: PropTypes.object.isRequired,
    onHandleModel:PropTypes.func.isRequired,
};

export default HostList;
