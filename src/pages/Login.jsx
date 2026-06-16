import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, findUserByEmail, setCurrentUser, makeId } from '../lib/storage';
import { useT } from '../lib/i18n';

export default function Login() {
  const { t } = useT();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [login, setLogin] = useState({ email: '', password: '' });
  const [reg, setReg] = useState({ name: '', email: '', password: '', campus: '', phone: '' });

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    const user = findUserByEmail(login.email.trim());
    if (!user || user.password !== login.password) { setError(t('login.errWrong')); return; }
    setCurrentUser(user.id);
    navigate('/dashboard');
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (!reg.name.trim() || !reg.email.trim() || !reg.password || !reg.campus.trim() || !reg.phone.trim()) { setError(t('login.errAll')); return; }
    if (!isEmail(reg.email.trim())) { setError(t('login.errEmail')); return; }
    if (reg.password.length < 4) { setError(t('login.errPw')); return; }
    if (findUserByEmail(reg.email.trim())) { setError(t('login.errExists')); return; }
    const user = { id: makeId(), name: reg.name.trim(), email: reg.email.trim(), password: reg.password, campus: reg.campus.trim(), phone: reg.phone.trim() };
    addUser(user);
    setCurrentUser(user.id);
    navigate('/dashboard');
  }

  return (
    <div className="container section">
      <div className="auth-card glass">
        <div className="auth-tabs">
          <button className={'auth-tab' + (mode === 'login' ? ' active' : '')} onClick={() => { setMode('login'); setError(''); }}>{t('login.tabLogin')}</button>
          <button className={'auth-tab' + (mode === 'register' ? ' active' : '')} onClick={() => { setMode('register'); setError(''); }}>{t('login.tabRegister')}</button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <h2>{t('login.welcome1')} <span className="gradient-text">{t('login.welcome2')}</span></h2>
            <p className="muted auth-sub">{t('login.welcomeSub')}</p>
            <div className="form-group">
              <label>{t('login.email')}</label>
              <input type="email" value={login.email} onChange={e => setLogin({ ...login, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>{t('login.password')}</label>
              <div className="pw-wrap">
                <input type={showPw ? 'text' : 'password'} value={login.password} onChange={e => setLogin({ ...login, password: e.target.value })} placeholder={t('login.passwordPlaceholder')} />
                <button type="button" className="pw-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary full">{t('login.loginBtn')}</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>{t('login.create1')} <span className="gradient-text">{t('login.create2')}</span></h2>
            <p className="muted auth-sub">{t('login.createSub')}</p>
            <div className="form-group">
              <label>{t('login.fullName')}</label>
              <input value={reg.name} onChange={e => setReg({ ...reg, name: e.target.value })} placeholder={t('login.namePlaceholder')} />
            </div>
            <div className="form-group">
              <label>{t('login.email')}</label>
              <input type="email" value={reg.email} onChange={e => setReg({ ...reg, email: e.target.value })} placeholder="you@example.com" />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>{t('login.campusLabel')}</label>
                <input value={reg.campus} onChange={e => setReg({ ...reg, campus: e.target.value })} placeholder={t('login.campusPlaceholder')} />
              </div>
              <div className="form-group">
                <label>{t('login.phoneLabel')}</label>
                <input value={reg.phone} onChange={e => setReg({ ...reg, phone: e.target.value })} placeholder="+86 138 0000 0000" />
              </div>
            </div>
            <div className="form-group">
              <label>{t('login.password')}</label>
              <div className="pw-wrap">
                <input type={showPw ? 'text' : 'password'} value={reg.password} onChange={e => setReg({ ...reg, password: e.target.value })} placeholder={t('login.createPwPlaceholder')} />
                <button type="button" className="pw-eye" onClick={() => setShowPw(!showPw)}>{showPw ? '🙈' : '👁'}</button>
              </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="btn btn-primary full">{t('login.createBtn')}</button>
          </form>
        )}
      </div>
    </div>
  );
}