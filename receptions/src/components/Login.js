
import React from 'react';
import { Form, Icon, Input, Button,Modal ,message} from 'antd';
import { connect } from 'dva';
import { getInfo  } from '../api/user';

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(){
      super(...arguments);
      this.state={
        show:true
      }
    };
    UNSAFE_componentWillReceiveProps(){
      setTimeout(()=>{
        this.setState({
          show:this.props.host.modelVisible
        })
      },100)


    }
    UNSAFE_componentWillMount() {
      this.setState({
        show:this.props.host.modelVisible
      })
      // const { receiveData } = this.props;
        // receiveData(null, 'auth');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                getInfo({account:values.userName,password:values.password}).then((res)=>{
                  console.log(res);
                  if(res.data.length){
                    localStorage.setItem('login',res.data[0]);
                    this.handleCancel();
                    message.success('登陆成功')
                  }else{
                    message.success('用户名或者密码错误')

                  }
                }).catch((res)=>{
                  console.log(res)
                })
            }
        });
    };
    handleCancel = (e)=>{
      this.setState({
        show:false
      });
      this.props.dispatch({
        type: 'host/modelVisible',
        payload: false,
      });
    };
    handleOpen = (e)=>{
      this.setState({
        show:true
      });
      this.props.dispatch({
        type: 'host/modelVisible',
        payload: true,
      });
    };
    render() {

      const { getFieldDecorator } = this.props.form;
        return (
        <Modal
          visible={this.state.show}
          title="登录"
          onCancel={this.handleCancel}
          footer={[

          ]}
        >
          <div className="login">
            <div className="login-form" >
              <div className="login-logo">
              </div>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem>
                  {/*{getFieldDecorator('remember', {*/}
                  {/*valuePropName: 'checked',*/}
                  {/*initialValue: true,*/}
                  {/*})(*/}
                  {/*/!*<Checkbox>记住我</Checkbox>*!/*/}
                  {/*)}*/}
                  {/*<a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>*/}
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                    登录
                  </Button>
                  <p style={{display: 'flex', justifyContent: 'space-between'}}>
                    {/*<a href="">或 现在就去注册!</a>*/}
                    {/*<a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>*/}
                  </p>
                </FormItem>
              </Form>
            </div>
          </div>

        </Modal>

        );
    }
}



export default connect(({ host }) => ({
  host,
}))(Form.create()(Login));
