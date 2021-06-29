import React from "react";

import { Link } from "react-router-dom";

import { Table, Button } from "antd";
import { EyeFilled, UserAddOutlined } from "@ant-design/icons";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import Api from "../../services/api";

interface IProvider {
  id: number;
  trading_name: string;
  company_name: string;
  ein: string;
  state_registration: string;
  phone_number: string;
  email: string;
  provides_tef: boolean;
  provides_software: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

const columns = [
  {
    title: "Ver",
    dataIndex: "id",
    key: "id",
    width: 50,
    render: (text) => (
      <Link to={`/fornecedores/${text}`}>
        <EyeFilled />
      </Link>
    ),
  },
  {
    title: "Código",
    dataIndex: "id",
    key: "id",
    responsive: ["sm"] as Breakpoint[],
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Razão Social",
    dataIndex: "trading_name",
    key: "trading_name",
    sorter: (a, b) => a.trading_name.localeCompare(b.trading_name),
  },
  {
    title: "CNPJ",
    dataIndex: "ein",
    key: "ein",
    responsive: ["sm"] as Breakpoint[],
    sorter: (a, b) => a.ein.localeCompare(b.ein),
  },
  {
    title: "Fantasia",
    dataIndex: "company_name",
    key: "company_name",
    responsive: ["sm"] as Breakpoint[],
    sorter: (a, b) => a.company_name.localeCompare(b.company_name),
  },
  {
    title: "TEF",
    dataIndex: "provides_tef",
    key: "provides_tef",
    responsive: ["sm"] as Breakpoint[],
    sorter: (a, b) => a.provides_tef - b.provides_tef,
    render: (text) => (text === 0 ? "Não" : "Sim"),
  },
  {
    title: "Sistema",
    dataIndex: "provides_software",
    key: "provides_software",
    responsive: ["sm"] as Breakpoint[],
    sorter: (a, b) => a.provides_software - b.provides_software,
    render: (text) => (text === 0 ? "Não" : "Sim"),
  },
];

const ProvidersPage: React.FC = () => {
  const [providers, setProviders] = React.useState<
    Array<IProvider> | undefined
  >([]);

  React.useEffect(() => {
    Api()
      .get("providers")
      .then((response) => {
        setProviders(response.data);
      });
  }, []);

  return (
    <>
      <h1>Fornecedores</h1>
      <Button type="primary">
        <UserAddOutlined />
        Adicionar Fornecedor
      </Button>
      <Table
        columns={columns}
        dataSource={providers}
        rowKey={(el) => el.id}
        pagination={{
          defaultPageSize: 50,
          position: ["topRight", "bottomRight"],
        }}
      ></Table>
    </>
  );
};

export default ProvidersPage;
