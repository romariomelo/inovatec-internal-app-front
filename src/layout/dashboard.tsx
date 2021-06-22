import React, { useContext } from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import MainMenu from "./menu";
import { useHistory } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleExitBtnClick = () => {
    if (auth.signOut) {
      auth.signOut(() => {
        history.push("/login");
      });
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
              style: { color: "#fff" },
            }
          )}
          <Button
            type="link"
            onClick={handleExitBtnClick}
            style={{ color: "#fff" }}
          >
            Sair
          </Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
