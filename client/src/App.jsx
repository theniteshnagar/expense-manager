import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import ManageExpense from './pages/ManageExpense';
import ProtectedRoute from './components/ProtectedRoute';
import UserLoggedIn from './components/UserLoggedIn';
import ProtectedLayout from './components/ProtectedLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UserLoggedIn><Login /></UserLoggedIn>} />
        <Route path="/register" element={<UserLoggedIn><Register /></UserLoggedIn>} />
        
        <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/add" element={<ManageExpense />} />
          <Route path="/expenses/:id/edit" element={<ManageExpense />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;