import React from "react";

import { Row, Col, Input, Form, Button, Modal } from "antd";
import Api from "../../../services/api";
import { useParams } from "react-router-dom";
import { Update } from "../../../models/clients";
import { LoadingOutlined } from "@ant-design/icons";

interface IClient {
  trading_name: string;
  company_name: string;
  ein: string;
  state_registration: string;
}

const ClientRecordPage: React.FC = () => {
  let params = useParams();
  const [client, setClient] = React.useState<IClient | {}>({});
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    Api()
      .get(`clients/${params.id}`)
      .then((response) => {
        const client: IClient = response.data;
        setClient(client);
        form.setFieldsValue(client);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setClient, form, params]);

  const onFinish = (values: any) => {
    setLoading(true);
    Update(values)
      .then(() => {
        Modal.info({
          content: "Gravado.",
        });
      })
      .catch((err) => {
        console.log(err.response);
        Modal.error({
          title: "Erro ao gravar",
          content: err.response.statusText
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      {loading ? (
        <>
          <h1>Aguarde...</h1>
          <LoadingOutlined style={{ fontSize: 30 }} />
        </>
      ) : (
        <>
          <Row>
            <Col>
              <h1>Ficha do cliente</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <Form
                layout="vertical"
                initialValues={client}
                onFinish={onFinish}
                form={form}
              >
                <Row justify="space-between">
                  <Col xs={24} sm={2}>
                    <Form.Item label="Código" name="id">
                      <Input readOnly />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={21}>
                    <Form.Item label="Razão Social" name="trading_name">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Fantasia" name="company_name">
                  <Input />
                </Form.Item>

                <Row justify="space-between">
                  <Col xs={24} sm={12}>
                    <Form.Item label="CNPJ" name="ein">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={11}>
                    <Form.Item label="IE" name="state_registration">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Col xs={24} sm={12}>
                    <Form.Item label="E-mail" name="email">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={11}>
                    <Form.Item label="Telefone" name="phone_number">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row justify="space-between">
                  <Col span={24}>
                    <Form.Item label="Observações" name="notes">
                      <Input.TextArea />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gravar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ClientRecordPage;
