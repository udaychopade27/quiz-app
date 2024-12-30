import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastifyConfig } from "../utils/config";
import { api_url } from "../utils/config";
import { useLocalStorage } from "usehooks-ts";
import Router from "next/router";

import axios from "axios";
import { errorHandler } from "../utils/errorHandler";

export function LoginOrRegister({ isLogin }: { isLogin: boolean }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [authToken, setAuthtoken] = useLocalStorage("authToken", "");
  const [userName, setUserName] = useLocalStorage("userName", "");

  const [authDone, setAuthDone] = useState(false);

  useEffect(() => {
    if (authToken) {
      Router.push("/quiz");
      return;
    }

    setAuthDone(true);
  }, [authToken]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  var data = JSON.stringify(formData);

  var config = {
    method: "post",
    url: isLogin ? ` ${api_url}/auth/login` : `${api_url}/auth/register`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function login() {
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAuthtoken(response.data.token);
        setUserName(response.data.username);
        toast.success("Login successful", toastifyConfig);
        Router.push("/quiz");
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message, toastifyConfig);
        } else {
          toast.error("Something went wrong", toastifyConfig);
        }
      });
  }
  async function register() {
    axios(config)
      .then(function (response) {
        toast.success("Register successful", toastifyConfig);
        Router.push("/");
      })
      .catch(function (error) {
        errorHandler({ error });
      });
  }

  async function handleLoginOrRegister() {
    if (isLogin) {
      await login();
    } else {
      await register();
    }
  }

  return (
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      {authDone && (
        <div className="card-body">
          <form action="">
            {!isLogin && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
              />
              {isLogin && (
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              )}
            </div>
          </form>
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={() => handleLoginOrRegister()}
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </div>
          <div className="form-control mt-2">
            <Link
              href={isLogin ? "./register" : "./"}
              className="btn btn-secondary"
            >
              or {!isLogin ? "Login" : "Register"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
