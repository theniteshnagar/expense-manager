import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import usePageTitle from "../hooks/usePageTitle";

const Dashboard = () => {
  usePageTitle("Dashboard");

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await API.get("/expenses");
        setExpenses(data);
      } catch (err) {
        setError("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const totalAmount = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalRecords = expenses.length;

  if (loading)
    return <p className="empty-state">Loading summary...</p>;

  return (
    <div>
      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h1>Dashboard</h1>
            <p className="page-subtitle">Track your spending in one place.</p>
          </div>
          <Link className="button button-primary" to="/expenses/add">
            + Add expense
          </Link>
        </div>
        {error && <p className="p-error">{error}</p>}
        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-label">Total expenses</span>
            <strong className="stat-value">₹ {totalAmount.toLocaleString()}</strong>
          </article>
          <article className="stat-card">
            <span className="stat-label">Total records</span>
            <strong className="stat-value">{totalRecords}</strong>
          </article>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Activity</p>
              <h2>Recent expenses</h2>
            </div>
            <Link to="/expenses" className="text-link">View all</Link>
          </div>
          {expenses.length === 0 ? (
            <p className="empty-state">No expenses recorded yet.</p>
          ) : (
            <ul className="expense-list">
              {expenses.slice(0, 5).map((exp) => (
                <li className="expense-row" key={exp._id}>
                  <div>
                    <strong>{exp.title}</strong>
                    <span>{exp.category}</span>
                  </div>
                  <strong className="expense-amount">₹ {exp.amount}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
