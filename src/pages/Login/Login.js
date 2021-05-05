import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAtom } from "jotai";

import { user } from "../../store/store";
import { LOGIN_USER } from "../../graphql/mutations";

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const Login = (props) => {
  const [userState, setUserState] = useAtom(user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [
    loginUser,
    { data: loginData, loading, error: loginError },
  ] = useMutation(LOGIN_USER);

  const onSubmit = async (data) => {
    try {
      const res = await loginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      // console.log("res = ", res.data.login);

      setUserState({
        id: res.data.login.id,
        email: res.data.login.email,
        role: res.data.login.role,
        fullname: res.data.login.fullname,
      });

      localStorage.setItem("token", res.data.login.token);
    } catch (err) {
      console.log("goes here");
      reset();
      console.log(err);
    }
  };

  if (userState !== null && userState !== undefined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form--container">
        <input
          {...register("email")}
          type="text"
          className="form--input"
          placeholder="Email"
        />
        <div className="form--error--msg">{errors.email?.message}</div>

        <input
          {...register("password")}
          type="password"
          className="form--input"
          placeholder="Password"
        />
        <div className="form--error--msg">{errors.password?.message}</div>

        <button type="submit" disabled={loading} className="form--submit">
          Submit
        </button>
        {loginError && (
          <div className="form--error--msg">{loginError.message}</div>
        )}
      </form>
      {loading && <PulseLoader />}
    </div>
  );
};

export default Login;
