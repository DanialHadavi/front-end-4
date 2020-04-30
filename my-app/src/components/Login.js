
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import axiosWithAuth from "./utils/AxiosWithAuth";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import * as yup from "yup";


const initialState = {
  username: "",
  password: "",
  isFetching: false,
};

const initialFormErrors = {

  username: "Username is required!",
  password: "Password is required!",
};

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must include at least 3 characters!")
    .required("Username is required!"),
  password: yup
    .string()
    .min(5, "Password must include at least 5 characters!")
    .required("Password is required!"),
});

export const Login = (props) => {
  const [login, setLogin] = useState(initialState);
  const [loginFormErrors, setLoginFormErrors] = useState(initialFormErrors);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    gsap.from(".login", { x: -500, duration: 1.0, ease: "expo.out" });
    gsap.fromTo(".login", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.0 });
  }, []);

  useEffect(() => {
    loginSchema.isValid(login).then((valid) => {
      setButtonEnabled(valid);
    });
  }, [login]);

  const handleChange = (e) => {
    e.persist();
    setLogin({ ...login, [e.target.name]: e.target.value });

    yup
      .reach(loginSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setLoginFormErrors({ ...loginFormErrors, [e.target.name]: "" });
      })
      .catch((err) => {
        setLoginFormErrors({
          ...loginFormErrors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axiosWithAuth()
    axios.post("https://secret-family-recipes-bw-team5.herokuapp.com/api/login", login)
    .then((res) => {
      localStorage.setItem('token', JSON.stringify(res.data.token));
        props.setUserId(res.data.id);
        console.log("Login data returning", res);
        props.history.push(`/${res.data.id}/recipe`);
        // reloadPage(); 
      })
      .catch((err) => {
        console.log("Login data failed to return", err);
      });
  };

  return (
    <div className="login">
      <h1 className="login-header">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Username: </label>
          <input
            className="login-textbx"
            placeholder="username"
            onChange={handleChange}
            type="text"
            name="username"
            value={login.username}
          ></input>
        </div>
        <div className="form-div">
          <label>Password: </label>
          <input
            className="login-textbx"
            placeholder="password"
            onChange={handleChange}
            type="password"
            name="password"
            value={login.password}
          ></input>
        </div>
        <div className="form-div">

          <button className="login-btn"
          onClick={(e)=>
        <Link to ="/recipe"/>
        }
          disabled={!buttonEnabled} type="submit">
            Login
          </button>
        </div>
        <div className="form-errors">{loginFormErrors.username}</div>
        <div className="form-errors">{loginFormErrors.password}</div>
        {login.isFetching && "Loading login page..."}
      </form>

      <div className="no-account">
        Don't have an account?{" "}
        <Link className="register-link" to="/register">
          Click here
        </Link>
      </div>
    </div>
  );
};


{
  /* <div>Don't have an account? <Link to=''>Click here</Link></div> */
}
