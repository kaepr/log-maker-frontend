import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import PulseLoader from "react-spinners/PulseLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAtom } from "jotai";

import { user } from "../../store/store";
import { GET_CURRENT_USER_LOG } from "../../graphql/queries";
import { CREATE_LOG } from "../../graphql/mutations";

const schema = yup.object().shape({
  body: yup.string().required().max(160).min(1),
  phoneNumber: yup.string().required().min(10).max(10),
});

const CreateLog = () => {
  const [userState, setUserState] = useAtom(user);
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

  const [
    createLog,
    { data: createData, loading, error: createError },
  ] = useMutation(CREATE_LOG);

  const onSubmit = async (formData) => {
    try {
      const res = await createLog({
        variables: {
          phoneNumber: formData.phoneNumber,
          body: formData.body,
        },
        update: (store, { data }) => {
          try {
            const logData = store.readQuery({
              query: GET_CURRENT_USER_LOG,
            });

            store.writeQuery({
              query: GET_CURRENT_USER_LOG,
              data: {
                getCurrentUserLogs: [
                  data.createLog,
                  ...logData.getCurrentUserLogs,
                ],
              },
            });
            setMsg("Log created successfully");
          } catch (err) {
            setErr("Log not created successfully");
            console.log("err", err);
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
    }, 3000);
  }, [msg, err]);

  return (
    <div className="container">
      <h2>Create Log</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="form--container">
        <input
          {...register("phoneNumber")}
          type="text"
          className="form--input"
          placeholder="Phone Number"
        />
        <div className="form--error--msg">{errors.phoneNumber?.message}</div>

        <textarea
          {...register("body")}
          type="text"
          className="form--input"
          placeholder="Body"
        />
        <div className="form--error--msg">{errors.body?.message}</div>

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

export default CreateLog;
