import Api from "../api";
import { getToken, removeToken, setToken } from "../token";

const Login = (
  email: string,
  password: string,
  cbSuccess: () => void,
  cbFailed?: (res: any) => void
): void => {
  Api().post("auth/login", {
    email,
    password,
  })
    .then((response) => {
      setToken(response.data.access_token);
      cbSuccess();
    })
    .catch((res) => {
      if (cbFailed) {
        cbFailed(res);
      }
    });
};

const Logout = (
  cbSuccess?: () => void,
  cbFailed?: (res: any) => void
): void => {
  Api().post(
    "auth/logout",
    {},
    { headers: { Authorization: `Bearer ${getToken()}` } }
  )
    .then(() => {
      removeToken();
      if (cbSuccess) {
        cbSuccess();
      }
    })
    .catch((res) => {
      if (cbFailed) {
        cbFailed(res);
      }
    });
};

export { Login, Logout };
