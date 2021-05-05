import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Logs from "./pages/Logs/Logs";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logs" component={Logs} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
