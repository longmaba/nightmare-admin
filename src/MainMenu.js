import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import HeroGenerator from './pages/HeroGenerator';

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className='logo' />
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<UserAddOutlined />}>
              Create Hero
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Header className='site-layout-background' style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Create Hero</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}
            >
              <HeroGenerator />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Nightmare Garden ©2021 Created by longmaba
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
