import { Link } from "react-router-dom";

const IndividualUser = ({ data }) => {
  return (
    <>
      <div></div>
      <div className="user--item">{data.fullname}</div>
      <div className="user--item">{data.email}</div>
      <div className="user--item">{data.role}</div>
      <div className="user--item">
        <Link
          to={{ pathname: "/updateuser", data: { data } }}
          className="form--submit log__create"
        >
          Update User
        </Link>
      </div>

      <div></div>
    </>
  );
};

const ShowUsers = ({ data }) => {
  if (data === null || data === undefined) {
    return <div>No Users</div>;
  }

  return (
    <div className="user--container">
      <div></div>
      <div className="user--font">Full Name</div>
      <div className="user--font">Email</div>
      <div className="user--font">Role</div>
      <div className="user--font">Edit</div>
      <div></div>
      {data.map((value) => {
        return <IndividualUser data={value} key={value.id} />;
      })}
    </div>
  );
};

export default ShowUsers;
