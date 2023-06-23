import { createContext } from "react";


const AppContext = createContext({
  client: {},
  token: undefined,
  username: undefined,
  setToken: () => {},
  role: undefined,
});

export default AppContext;