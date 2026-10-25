import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import usePageTitle from '../hooks/usePageTitle';

const Register = () => {
    usePageTitle("Register")

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
    <div className="auth-container">
      <h1>Create account</h1>
      <p className="auth-subtitle">Start managing your expenses today.</p>
      {error && <p className="p-error">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="register-email">Email</label>
          <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-field">
          <label htmlFor="register-password">Password</label>
          <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="button button-primary full-width" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </main>
  );
};

export default Register;