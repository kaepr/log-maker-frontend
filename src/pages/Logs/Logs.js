import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import PulseLoader from "react-spinners/PulseLoader";

import ShowLogs from "./ShowLogs";
import { user } from "../../store/store";
import { GET_CURRENT_USER_LOG } from "../../graphql/queries";

const Logs = () => {
  const [userData] = useAtom(user);
  const { data, loading, error } = useQuery(GET_CURRENT_USER_LOG);

  console.log("data = ", data);
  console.log("loading = ", loading);
  console.log("error = ", error);

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="container log__wrapper">
      {loading ? (
        <PulseLoader />
      ) : (
        <>
          <h2>Logs</h2>
          <Link to="/createlog" className="form--submit log__create">
            Create Log
          </Link>
          <p>Logs created by : {userData.fullname}</p>
          {data !== undefined ? (
            <>
              <p>Total Number of posts : {data.getCurrentUserLogs.length}</p>
              <ShowLogs data={data.getCurrentUserLogs} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Logs;
