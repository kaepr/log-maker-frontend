import { useAtom } from "jotai";
import { user } from "../../store/store";

const Home = () => {
  const [userData] = useAtom(user);

  let logged = false;

  if (userData !== null && userData !== undefined) {
    logged = true;
  }

  return (
    <div className="container">
      <h2>Home</h2>
      {logged && <h3>Welcome {userData.fullname}</h3>}
    </div>
  );
};

export default Home;
