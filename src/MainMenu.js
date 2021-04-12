import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import HeroGenerator from './pages/HeroGenerator';
import LevelEditor from './pages/LevelEditor';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <div className='logo' />
            <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1' icon={<UserAddOutlined />}>
                <Link to='/create-hero'>Create Hero</Link>
              </Menu.Item>
              <Menu.Item key='2' icon={<UserAddOutlined />}>
                <Link to='/create-level'>Level Editor</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className='site-layout'>
            <Header className='site-layout-background' style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Switch>
                <Route path='/create-hero'>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Create Hero</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className='site-layout-background'
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <HeroGenerator />
                  </div>
                </Route>
                <Route path='/create-level'>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Level Editor</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className='site-layout-background'
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <LevelEditor />
                  </div>
                </Route>
                <Route path='/'>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Create Hero</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    className='site-layout-background'
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    <HeroGenerator />
                  </div>
                </Route>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Nightmare Garden ©2021 Created by longmaba
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default SiderDemo;
