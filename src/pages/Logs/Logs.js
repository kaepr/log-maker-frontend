import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import PulseLoader from "react-spinners/PulseLoader";

import ShowLogs from "./ShowLogs";
import { user } from "../../store/store";
import { GET_CURRENT_USER_LOG } from "../../graphql/queries";

const Logs = () => {
  const [userData] = useAtom(user);

  const [offset, setOffset] = useState(0);
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);

  const handleClick = (e, type) => {
    e.preventDefault();
    console.log("type = ", type);
    if (type === "PREV") {
      setOffset(offset - 10);
    }

    if (type === "NEXT") {
      setOffset(offset + 10);
    }
  };

  const { data, loading, error } = useQuery(GET_CURRENT_USER_LOG, {});

  useEffect(() => {
    if (offset < 10) {
      setLeft(true);
    }

    if (offset >= 10) {
      setLeft(false);
    }

    if (data !== null && data !== undefined) {
      if (data.getCurrentUserLogs.length >= 10) {
        setRight(false);
      }
    }

    if (data !== null && data !== undefined) {
      if (data.getCurrentUserLogs.length < 10) {
        setRight(true);
      }
    }
  }, [offset, data]);

  console.log(offset);

  // console.log("data = ", data);
  // console.log("loading = ", loading);
  // console.log("error = ", error);

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
              <p>Total Number of logs : {data.getCurrentUserLogs.length}</p>
              <ShowLogs data={data.getCurrentUserLogs} />
            </>
          ) : null}

          <div className="paginate">
            <button
              className="btn"
              onClick={(e) => handleClick(e, "PREV")}
              disabled={left}
            >
              {" "}
              Previous
            </button>
            <p>{offset / 10 + 1}</p>
            <button
              className="btn"
              onClick={(e) => handleClick(e, "NEXT")}
              disabled={right}
            >
              NEXT{" "}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Logs;
