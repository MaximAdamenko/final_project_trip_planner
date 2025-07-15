import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <Navbar />
        <p>You are not logged in.</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <h2>Welcome, {user.email}</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
}

