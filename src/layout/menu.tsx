import React from "react";

import {Menu} from 'antd'

import {
    UserOutlined,
    CodeSandboxOutlined,
    CreditCardOutlined,
    HomeOutlined,
  } from "@ant-design/icons";

  import { Link } from "react-router-dom";

const MainMenu: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Início</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/clientes">Clientes</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<CodeSandboxOutlined />}>
        <Link to="/fornecedores">Fornecedores</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<CreditCardOutlined />}>
      <Link to="/tef">TEF</Link>
      </Menu.Item>
    </Menu>
  );
};

export default MainMenu;
