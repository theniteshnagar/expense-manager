import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const { data } = await API.get('/expenses');
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await API.delete(`/expenses/${id}`);
        setExpenses(expenses.filter((exp) => exp._id !== id));
      } catch (err) {
        alert('Failed to delete expense');
      }
    }
  };

  if (loading) return <p className="empty-state">Loading expenses...</p>;

  return (
    <div>
      <main className="page-shell">
        <div className="page-header">
          <div>
            <p className="eyebrow">Activity</p>
            <h1>All expenses</h1>
            <p className="page-subtitle">Review and manage your spending.</p>
          </div>
          <Link to="/expenses/add" className="button button-primary">+ Add expense</Link>
        </div>
        {error && <p className="p-error">{error}</p>}
        <section className="panel table-wrapper">
          {expenses.length === 0 ? (
            <p className="empty-state">No expenses recorded yet.</p>
          ) : (
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Title</th><th>Category</th><th>Amount</th>
                  <th>Payment method</th><th>Date</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp) => (
                  <tr key={exp._id}>
                    <td>{exp.title}</td>
                    <td>{exp.category}</td>
                    <td>₹ {exp.amount}</td>
                    <td>{exp.paymentMethod}</td>
                    <td>{new Date(exp.date).toLocaleDateString()}</td>
                    <td>
                      <div className="table-actions">
                        <button className="button button-warning" onClick={() => navigate(`/expenses/${exp._id}/edit`)}>Edit</button>
                        <button className="button button-danger" onClick={() => handleDelete(exp._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default ExpenseList;