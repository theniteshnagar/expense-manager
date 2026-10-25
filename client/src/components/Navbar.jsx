import { Link, useNavigate } from "react-router-dom";
import HandleLogout from "./HandleLogout";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h3>Expense Tracker</h3>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/expenses/add">Add Expense</Link>
        </li>
        <li>
          <button onClick={() => HandleLogout(navigate)}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
