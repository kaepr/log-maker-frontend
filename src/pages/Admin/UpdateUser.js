import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { GET_USERS } from "../../graphql/queries";
import { UPDATE_USER } from "../../graphql/mutations";

const schema = yup.object().shape({
  email: yup.string().email().min(3).max(255),
  fullname: yup.string().min(3).max(255),
  role: yup.string(),
  password: yup.string().min(6).max(255),
});

const UpdateUser = (data) => {
  //   console.log("update data = ", data);
  const userDataProps = data.history.location.data.data;
  console.log("update data = ", userDataProps);

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userDataProps.email,
      role: userDataProps.role,
      fullname: userDataProps.fullname,
    },
  });

  const [
    updateUser,
    { data: updateData, loading, error: updateError },
  ] = useMutation(UPDATE_USER);

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    try {
      const res = await updateUser({
        variables: {
          id: userDataProps.id,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          fullname: formData.fullname,
        },
        update: (store, { data }) => {
          try {
            const userData = store.readQuery({
              query: GET_USERS,
            });

            console.log("user data = ", userData);
            console.log("data = ", data);
            const index = userData.getUsers.findIndex(
              (elm) => elm.id === data.updateUser.id
            );

            console.log("index = ", index);

            let tempArr = [...userData.getUsers];
            tempArr[index] = data.updateUser;

            console.log(("temparr", tempArr));

            store.writeQuery({
              query: GET_USERS,
              data: {
                getUsers: tempArr,
              },
            });

            console.log("data = ", data);
            setMsg("User updated successfully");
          } catch (err) {
            console.log("err", err);
            setErr("User not updated successfully");
          }
        },
        // refetchQueries: [
        //   {
        //     query: GET_USERS,
        //   },
        // ],
      });
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

  console.log("create error = ", updateError);

  return (
    <div className="container">
      <h2>Update User</h2>

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
        {updateError && (
          <div className="form--error--msg">{updateError.message}</div>
        )}
      </form>
      <div className="log__success">{msg}</div>
      <div className="log__warning">{err}</div>
      {loading && <PulseLoader />}
    </div>
  );
};

export default UpdateUser;
