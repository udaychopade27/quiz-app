import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Router from "next/router";

export function LoginOrRegister() {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      Router.push("/quiz");
    }
  }, [initialized, keycloak.authenticated]);

  const handleLogin = () => {
    keycloak.login();
  };

  const handleRegister = () => {
    keycloak.register();
  };

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="form-control mt-2">
          <button className="btn btn-secondary" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
