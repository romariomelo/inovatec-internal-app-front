import AuthContext from "./AuthContext";
import { useAuth } from "../hooks/useAuth";

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
