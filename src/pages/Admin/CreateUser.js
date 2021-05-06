import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { GET_USERS } from "../../graphql/queries";
import { CREATE_USER } from "../../graphql/mutations";

const schema = yup.object().shape({
  email: yup.string().email().min(3).max(255),
  password: yup.string().min(6).max(255),
  confirmpassword: yup.string().min(3).max(255),
  fullname: yup.string().min(3).max(255),
  role: yup.string(),
});

const CreateUser = () => {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createUser, { data, loading, error: createError }] = useMutation(
    CREATE_USER
  );

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    try {
      const res = await createUser({
        variables: {
          email: formData.email,
          password: formData.password,
          confirmpassword: formData.confirmpassword,
          role: formData.role,
          fullname: formData.fullname,
        },
        update: (store, { data }) => {
          try {
            const userData = store.readQuery({
              query: GET_USERS,
            });

            store.writeQuery({
              query: GET_USERS,
              data: {
                getUsers: [data.register, ...userData.getUsers],
              },
            });

            setMsg("User created successfully");
          } catch (err) {
            setErr("User not updated successfully");
          }
        },
      });
      reset();
    } catch (err) {
      reset();
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMsg("");
      setErr("");
    }, 5000);
  }, [msg, err]);

  return (
    <div className="container">
      <h2>Create User</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form--container">
        <input
          {...register("fullname")}
          type="text"
          className="form--input"
          placeholder="Full Name"
        />
        <div className="form--error--msg">{errors.fullname?.message}</div>

        <input
          {...register("email")}
          type="email"
          className="form--input"
          placeholder="Email ID"
        />
        <div className="form--error--msg">{errors.email?.message}</div>

        <input
          {...register("password")}
          type="password"
          className="form--input"
          placeholder="Password"
        />
        <div className="form--error--msg">{errors.password?.message}</div>

        <input
          {...register("confirmpassword")}
          type="password"
          className="form--input"
          placeholder="Confirm password"
        />
        <div className="form--error--msg">
          {errors.confirmpassword?.message}
        </div>

        <select {...register("role")} className="form--select">
          <option value="USER" className="form--option">
            User
          </option>
          <option value="ADMIN" className="form--option">
            Admin
          </option>
        </select>

        <button type="submit" disabled={loading} className="form--submit">
          Submit
        </button>
        {createError && (
          <div className="form--error--msg">{createError.message}</div>
        )}
      </form>
      <div className="log__success">{msg}</div>
      <div className="log__warning">{err}</div>
      {loading && <PulseLoader />}
    </div>
  );
};

export default CreateUser;
