import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { createHashHistory } from 'history';
import './login.css';
import axios from 'axios';
import { setToken } from '@utils/util';
import loginService from '@services/loginService'

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        loginService.login(values).then(data => {
          if (!data) {
            message.error('出现意外错误！');
            return;
          }
          if (data.code === '0') {
            setToken(data.data.token);
            localStorage.setItem('username',data.data.username);
            message.success('登陆成功！');
            createHashHistory().push('/');
          } else {
            message.error('登陆失败！');
          }
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="login" >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="title">wesion console</div>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
                </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
                </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}


export default Form.create({ name: 'Login' })(Login);;