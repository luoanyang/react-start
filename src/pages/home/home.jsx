import React from 'react';
import { Layout, Menu, Icon, Table, Spin, Avatar, Popconfirm, Select, Button, message } from 'antd';
import './home.css';
import activityService from '@services/activityService';
import { removeToken } from '@utils/util';
import { createHashHistory } from 'history';
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const columns = [
  {
    title: '活动名称',
    dataIndex: 'name',
  },
  {
    title: '姓名',
    dataIndex: 'user_name',
  },
  {
    title: '性别',
    dataIndex: 'user_sex',
  },
  {
    title: '电话',
    dataIndex: 'user_mobile',
  },
  {
    title: '省份',
    dataIndex: 'user_province',
  },
  {
    title: '城市',
    dataIndex: 'user_city',
  },
  {
    title: '来源',
    dataIndex: 'source',
  },
  {
    title: '提交时间',
    dataIndex: 'create_time',
  },
];

class Index extends React.Component {
  constructor(props) {
    super();
    let optionsData = ['荣威预约试驾201909', '沃尔沃预约试驾201910'];
    if(localStorage.getItem('username') === 'sohu'){
      optionsData = ['荣威预约试驾201909'];
    }else if(localStorage.getItem('username') === 'volvo'){
      optionsData = ['沃尔沃预约试驾201910'];
    }
    this.state = {
      collapsed: false,
      optionsData,
      selectOption: optionsData[0]
    }
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  selectChange = (selectOption) => {
    this.setState({
      selectOption
    });
    this.getActivityData(selectOption);
  }

  downExcel = () => {
    activityService.downExcel(this.state.selectOption).then(res => {
      if (res && res.data) {
        window.open(res.data);
        message.success('下载成功！');
        return;
      }
      message.error('下载失败！');
    });
  }

  logout = () => {
    removeToken();
    createHashHistory().push('/login');
  }

  getActivityData = (name) => {
    activityService.findByName(name).then(res => {
      this.setState({
        activityData: res.data
      });
    });
  }

  componentWillMount() {
    this.getActivityData(this.state.selectOption);
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>活动报名</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="avatar-box">
              <Popconfirm title="确定退出登录？" placement="bottomRight" okText="Yes" cancelText="No" onConfirm={this.logout}>
                <Avatar size="small" icon="user" />
              </Popconfirm>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <div className="filter-section">
              <div>
                <b>选择活动：</b>
                <Select defaultValue={this.state.selectOption} style={{ width: 180 }} onChange={this.selectChange}>
                  {
                    this.state.optionsData.map(item => {
                      return <Option value={item} key={item}>{item}</Option>
                    })
                  }
                </Select>
              </div>

              <Button type="primary" icon="download" onClick={this.downExcel}>下载Excel</Button>
            </div>
            {this.state.activityData ? <Table columns={columns} dataSource={this.state.activityData} rowKey="id" /> : <Spin className="spin" />}
          </Content>
        </Layout>
      </Layout >
    );
  }
}

export default Index;
