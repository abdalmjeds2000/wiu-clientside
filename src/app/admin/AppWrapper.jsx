import { createContext, useContext, useState } from "react";
import { RenderMenu, RenderRoutes } from "../structure/RenderNavigation";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, FundProjectionScreenOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthData } from "../../auth/AuthWrapper";
import useBreadcrumbs from 'use-react-router-breadcrumbs'
import { Link } from "react-router-dom";
import { nav } from "../structure/navigation";

const AppContext = createContext();
export const AppData = () => useContext(AppContext);


export const AppWrapper = () => {
  const { user, logout } = AuthData();
  // const [collapsed, setCollapsed] = useState(false);
  // default close if window width is less than 768px
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const { token: { colorBgContainer } } = theme.useToken();

  const contextObj = {};

  return (
    <AppContext.Provider value={contextObj}>
      <Layout style={{ minHeight: '100vh' }}>
        {window.innerWidth < 768 && <Button
          type="primary"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ display: !collapsed ? 'none' : 'block' , position: 'fixed', borderRadius: '99px', fontSize: '16px', width: 35, height: 35, right: 2, top: 10, zIndex: 9999 }}
        />}
        {user.isAuthenticated && 
          <Sider trigger={null} collapsible collapsed={collapsed} className={`${!collapsed ? 'max-md:block' : 'max-md:hidden'}`} style={{ height: '100vh', position: 'sticky', top: 0}}>
            <Button
              type="primary"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: '100%', height: 64, borderRadius: 0, marginBottom: 24, background: '#eee', color: '#000' }}
            />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
              {
                nav.filter(r => r.isMenu)
                .map(({ title, path, icon }, index) =>
                  <Menu.Item key={index} icon={icon}>
                    <Link to={path}>{title}</Link>
                  </Menu.Item>
                )
              }
              <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ position: 'absolute', bottom: 0 }} onClick={logout}>
                <Link to="/login">تسجيل خروج</Link>
              </Menu.Item> 
            </Menu>
          </Sider>}
        <Layout>
          {user.isAuthenticated && 
            <Header style={{ background: colorBgContainer }}>
              <RenderMenu />
            </Header>}
          <Content className={`mx-4 my-6 p-6 min-h-[280px] rounded-2xl bg-[${colorBgContainer}]`}>
            <RenderRoutes />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            2023 WIU ©
          </Footer>
        </Layout>
      </Layout>
    </AppContext.Provider>
  )
}

export default AppWrapper