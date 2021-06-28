import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import {
  LoginPage,
  HomePage,
  ClientsPage,
  ProvidersPage,
  TefPage,
  ClientRecordPage,
} from "../pages";

import PrivateRoute from "../helpers/PrivateRoute";

const Routes: React.FC = () => {

  return (
    <ConfigProvider locale={ptBR}>
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <PrivateRoute path="/clientes" exact>
            <ClientsPage />
          </PrivateRoute>
          <PrivateRoute path="/clientes/:id">
            <ClientRecordPage />
          </PrivateRoute>
          <PrivateRoute path="/fornecedores">
            <ProvidersPage />
          </PrivateRoute>
          <PrivateRoute path="/tef">
            <TefPage />
          </PrivateRoute>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
    </ConfigProvider>
  );
};

export default Routes;
