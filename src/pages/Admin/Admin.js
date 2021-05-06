import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import PulseLoader from "react-spinners/PulseLoader";

import ShowUsers from "./ShowUsers";
import { user } from "../../store/store";
import { GET_USERS } from "../../graphql/queries";

const Admin = () => {
  const [userData] = useAtom(user);
  const { data, loading, error } = useQuery(GET_USERS);

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
              <p>Total Number of users : {data.getUsers.length}</p>
              <ShowUsers data={data.getUsers} />
            </>
          ) : null}
        </>
      )}
    </div>
  );

  {
    /* return (
    <div className="container">
      <h2>Admin</h2>
    </div>
  ); */
  }
};

export default Admin;
