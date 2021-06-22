import React from "react";
import Api from "../services/api";
import { Login, Logout } from "../services/auth";

const useAuth = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsLoading(true);
    const init = async () => {
      try {
        const response = await Api().post("auth/me");
        if (response.status === 200) {
          setIsLogged(true);
        }
      } catch (err) {
        if (err.response.status === 401) {
          setIsLogged(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const signIn = (
    email: string,
    password: string,
    cbSuccess: () => void,
    cbFailed?: (res: any) => void
  ) => {
    Login(
      email,
      password,
      () => {
        setIsLogged(true);
        if (cbSuccess) {
          cbSuccess();
        }
      },
      (res) => {
        if (cbFailed) {
          cbFailed(res);
        }
      }
    );
  };

  const signOut = (cbSuccess?: () => void, cbFailed?: (res: any) => void) => {
    Logout(() => {
      setIsLogged(false);
      if (cbSuccess) {
        cbSuccess();
      }
    }, cbFailed);
  };

  return {
    signOut,
    signIn,
    isLoading,
    isLogged,
  };
};

export { useAuth };
