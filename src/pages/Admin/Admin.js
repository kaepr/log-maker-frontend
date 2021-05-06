import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import ShowUsers from "./ShowUsers";
import { GET_USERS } from "../../graphql/queries";

const Admin = () => {
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

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      offset: offset,
      limit: 10,
    },
  });

  useEffect(() => {
    if (offset < 10) {
      setLeft(true);
    }

    if (offset >= 10) {
      setLeft(false);
    }

    if (data !== null && data !== undefined) {
      if (data.getUsers.length >= 10) {
        setRight(false);
      }
    }

    if (data !== null && data !== undefined) {
      if (data.getUsers.length < 10) {
        setRight(true);
      }
    }
  }, [offset, data]);

  console.log(offset);

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {loading ? (
        <PulseLoader />
      ) : (
        <>
          <h2>Admin</h2>
          <Link to="/createuser" className="form--submit log__create">
            Create User
          </Link>
          {data !== undefined ? (
            <>
              <p>Number of users on this page : {data.getUsers.length}</p>
              <ShowUsers data={data.getUsers} />
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

export default Admin;
