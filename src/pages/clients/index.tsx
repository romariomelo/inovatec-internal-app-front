import React from "react";
import { Table, Button, Empty } from "antd";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import { EyeFilled, UserAddOutlined } from '@ant-design/icons';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

const columns = [
  {
    title: "Ver",
    dataIndex: "id",
    key: "id",
    width: 50,
    render: text => <Link to={`/clientes/${text}`}><EyeFilled /></Link>
  },
  {
    title: "Código",
    dataIndex: "id",
    key: "id",
    responsive: ['sm'] as Breakpoint[],
    sorter: (a, b) => a.id - b.id
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
    responsive: ['sm'] as Breakpoint[],
    sorter: (a, b) => a.ein.localeCompare(b.ein),
  },
  {
    title: "Fantasia",
    dataIndex: "company_name",
    key: "company_name",
    responsive: ['sm'] as Breakpoint[],
    sorter: (a, b) => a.company_name.localeCompare(b.company_name),
  },
];

const ClientsPage: React.FC = () => {
  const [clients, setClients] = React.useState(undefined);
  const [status, setStatus] = React.useState<string>("");
  const [showError, setShowError] = React.useState<boolean>(false)

  React.useEffect(() => {
    handleInit();
  }, []);

  const handleInit = () => {

    setShowError(false);
    setStatus("Carregando...");

    Api()
      .get("clients")
      .then((response) => {
        setClients(response.data);
        setShowError(false);
        setStatus("");
      })
      .catch(() => {
        setStatus("Falha ao buscar dados!");
        setShowError(true);
      });
  };

  return (
    <>
      <h1>Clientes</h1>

      <Button type="primary"><UserAddOutlined /> Novo Cliente</Button>

      <h1>{status}</h1>
      {showError ?
        <Button type="primary" onClick={handleInit}>Tentar novamente</Button>
      : null }

      {clients ? (
        <Table
          columns={columns}
          dataSource={clients}
          pagination={{ defaultPageSize: 50, position: ['topRight', 'bottomRight'] }}
          rowKey={(el) => el.id}
          locale={{ emptyText: <Empty description="Sem dados cadastrados." /> }}
        />
      ) : null}
    </>
  );
};

export default ClientsPage;
