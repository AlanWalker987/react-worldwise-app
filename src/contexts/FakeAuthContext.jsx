import { useReducer, createContext, useContext } from "react";

const FakeAuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error("Authcontext is used outside the auth provider");
  return context;
}

export { AuthProvider, useAuth };
