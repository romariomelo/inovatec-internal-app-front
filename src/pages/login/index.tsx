import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { Layout, Row, Col, Form, Input, Button, Modal } from "antd";
import AuthContext from "../../contexts/AuthContext";

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginPage: React.FC = () => {
  let query = useQuery();

  let redirectTo = query.get('redirectTo');
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onFinish = (values: any) => {
    handleLogin(values.email, values.password);
  };

  const handleLogin = (email: string, password: string) => {

    if (auth.signIn) {
      auth.signIn(
        email,
        password,
        () => {
          history.push(redirectTo ? redirectTo : "/");
        },
        (res) => {
          if (res.response.status === 401) {
            console.log("USUÁRIO OU SENHA INCORRETA");
            Modal.error({
              title: "Usuário ou senha inválida.",
              content: "Verifique o usuário e senha digitada.",
            });
          }
        }
      );
    }
  };

  if (auth.isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      {auth.isLogged ? ( // SE ESTIVER LOGADO, VAI PARA PÁGINA PRINCIPAL
        <Redirect to={redirectTo ? redirectTo : "/"} />
      ) : (
        <Layout>
          <Layout.Header></Layout.Header>
          <Layout.Content
            style={{ marginTop: "5rem", height: "calc(100vh - 228px)" }}
          >
            <Row>
              <Col xs={22} offset={1}>
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <Form
                  {...layout}
                  onFinish={onFinish}
                  name="basic"
                  initialValues={{
                    email: "romario@inovatecstore.com.br",
                    password: "123",
                  }}
                >
                  <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Digite seu e-mail!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Digite sua senha!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...tailLayout}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={auth.isLoading}
                    >
                      {auth.isLoading ? "Entrando... Aguarde!" : "Entrar"}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Layout.Content>
          <Layout.Footer>
            <p style={{ textAlign: "right" }}>Desenvolvido por: Romário Melo</p>
          </Layout.Footer>
        </Layout>
      )}
    </>
  );
};

export default LoginPage;
