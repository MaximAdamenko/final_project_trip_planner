import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();         
    navigate('/login'); 
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {user ? (
        <>
          <span style={{ marginRight: '10px' }}>Welcom, {user.email}</span>
          <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
          <Link to="/plan" style={{ marginRight: '10px' }}>Plan</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
