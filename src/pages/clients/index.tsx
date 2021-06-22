import React from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import Api from "../../services/api";
import { EyeFilled } from '@ant-design/icons';
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
  },
  {
    title: "Razão Social",
    dataIndex: "trading_name",
    key: "trading_name",
  },
  {
    title: "CNPJ",
    dataIndex: "ein",
    key: "ein",
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: "Fantasia",
    dataIndex: "company_name",
    key: "company_name",
    responsive: ['sm'] as Breakpoint[],
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

      <Button type="primary">Novo Cliente</Button>

      <h1>{status}</h1>
      {showError ?
        <Button type="primary" onClick={handleInit}>Tentar novamente</Button>
      : null }

      {clients ? (
        <Table
          columns={columns}
          dataSource={clients}
          pagination={{ pageSize: 50 }}
          rowKey={(el) => el.id}
        />
      ) : null}
    </>
  );
};

export default ClientsPage;
