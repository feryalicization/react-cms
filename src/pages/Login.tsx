import { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';

const Login = () => {
  const login = useLogin();
  const notify = useNotify();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form).catch(() => notify('Login failed'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
