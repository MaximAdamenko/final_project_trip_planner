import Navbar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        email,
        password,
      });
      alert('Registration successful! You can now log in.');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

