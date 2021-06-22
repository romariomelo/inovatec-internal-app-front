import React, { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Dashboard from "../layout/dashboard";

interface IPrivateRoute {
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...rest }) => {

  const location = useLocation();

  const auth = useContext(AuthContext)

  if (auth.isLoading) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      {auth.isLogged ? (
        <Route {...rest}>
          <Dashboard>{children}</Dashboard>
        </Route>
      ) : (
        <Redirect to={`/login?redirectTo=${location.pathname}`} />
      )}
    </>
  );
};

export default PrivateRoute;
