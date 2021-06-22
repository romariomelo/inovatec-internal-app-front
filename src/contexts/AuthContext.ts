import { createContext } from "react";

interface IAuthContext {
  signOut: (sbSuccess?: () => void, cbFailed?: () => void) => void;
  signIn: (
    email: string,
    password: string,
    cbSuccess: () => void,
    cbFailed?: (res) => void
  ) => void;
  isLoading: boolean;
  isLogged: boolean;
}

const AuthContext = createContext<Partial<IAuthContext>>({});

export default AuthContext;
