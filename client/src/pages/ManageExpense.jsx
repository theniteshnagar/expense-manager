import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

const ManageExpense = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    paymentMethod: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchExpense = async () => {
        try {
          const { data } = await API.get(`/expenses/${id}`);
          setFormData({
            ...data,
            date: data.date.split('T')[0],
          });
        } catch (err) {
          setError('Failed to fetch expense details');
        }
      };
      fetchExpense();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        await API.put(`/expenses/${id}`, formData);
      } else {
        await API.post('/expenses', formData);
      }
      navigate('/expenses');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <main className="page-shell">
        <form className="form-card" onSubmit={handleSubmit}>
          <h1>{isEditMode ? 'Edit expense' : 'Add expense'}</h1>
          <p className="form-subtitle">Keep your spending details organized.</p>
          {error && <p className="p-error">{error}</p>}
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="amount">Amount</label>
              <input id="amount" type="number" name="amount" value={formData.amount} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="category">Category</label>
              <input id="category" type="text" name="category" placeholder="Food, Transport, Lifestyle" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="paymentMethod">Payment method</label>
              <input id="paymentMethod" type="text" name="paymentMethod" placeholder="Credit Card, UPI, Cash" value={formData.paymentMethod} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-field form-field-full">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" required />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="button button-secondary" onClick={() => navigate('/expenses')}>Cancel</button>
            <button type="submit" className="button button-primary" disabled={loading}>{loading ? 'Saving...' : 'Save expense'}</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ManageExpense;