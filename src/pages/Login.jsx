import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, findUserByEmail, setCurrentUser, makeId } from '../lib/storage';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');   // 'login' or 'register'
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [login, setLogin] = useState({ email: '', password: '' });
  const [reg, setReg] = useState({ name: '', email: '', password: '', campus: '', phone: '' });

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    const user = findUserByEmail(login.email.trim());
    if (!user || user.password !== login.password) {
      setError('Wrong email or password. New here? Create an account.');
      return;
    }
    setCurrentUser(user.id);
    navigate('/dashboard');
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (!reg.name.trim() || !reg.email.trim() || !reg.password || !reg.campus.trim() || !reg.phone.trim()) {
      setError('Please fill in all fields.'); return;
    }
    if (!isEmail(reg.email.trim())) { setError('Please enter a valid email.'); return; }
    if (reg.password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    if (findUserByEmail(reg.email.trim())) { setError('An account with this email already exists.'); return; }

    const user = {
      id: makeId(),
      name: reg.name.trim(),
      email: reg.email.trim(),
      password: reg.password,
      campus: reg.campus.trim(),
      phone: reg.phone.trim(),
    };
    addUser(user);
    setCurrentUser(user.id);
    navigate('/dashboard');
  }

  return (
    <div className="container section">
      <div className="auth-card glass">
        <div className="auth-tabs">
          <button className={'auth-tab' + (mode === 'login' ? ' active' : '')} onClick={() => { setMode('login'); setError(''); }}>Login</button>
          <button className={'auth-tab' + (mode === 'register' ? ' active' : '')} onClick={() => { setMode('register'); setError(''); }}>Register</button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <h2>Welcome <span className="gradient-text">back</span></h2>
            <p className="muted auth-sub">Log in to your account</p>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} placeholder="you@example.com" />
            </div>
           <div className="form-group">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPw ? 'text' : 'password'} value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} placeholder="Your password" />
                <button type="button" className="pw-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary full">Log in</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>Create <span className="gradient-text">account</span></h2>
            <p className="muted auth-sub">Join free and start swapping</p>
            <div className="form-group">
              <label>Full name</label>
              <input value={reg.name} onChange={e => setReg({ ...reg, name: e.target.value })} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={reg.email} onChange={e => setReg({ ...reg, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>University / Campus</label>
                <input value={reg.campus} onChange={e => setReg({ ...reg, campus: e.target.value })} placeholder="e.g. Main Campus" />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp</label>
                <input value={reg.phone} onChange={e => setReg({ ...reg, phone: e.target.value })} placeholder="+86 138 0000 0000" />
              </div>
            </div>
           <div className="form-group">
              <label>Password</label>
              <div className="pw-wrap">
                <input type={showPw ? 'text' : 'password'} value={reg.password} onChange={e => setReg({ ...reg, password: e.target.value })} placeholder="Create a password" />
                <button type="button" className="pw-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary full">Create account</button>
          </form>
        )}
      </div>
    </div>
  );
}