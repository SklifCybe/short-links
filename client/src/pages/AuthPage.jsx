import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { login } from '../store/actions/auth';

export const AuthPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({ email: '', password: '' });

  const formHandler = (event) => {
    setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const enterHandler = async () => {
    try {
      const {
        data: { token, userId },
      } = await axios.post('/api/auth/login', { ...form });
      dispatch(login(token, userId));
    } catch (err) {
      const message = err.response.data.message;
      window.M.toast({ html: message });
      console.error(err);
    }
  };

  const registHandler = async () => {
    try {
      const {
        data: { message },
      } = await axios.post('/api/auth/registration', { ...form });
      window.M.toast({ html: message });
    } catch (err) {
      const message = err.response.data.message;
      window.M.toast({ html: message });
      console.error(err);
    }
  };

  return (
    <div className="row auth-block">
      <div className="col s6 offset-s3">
        <div className="card purple darken-4">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate card-field"
                value={form.email}
                onChange={formHandler}
              />
              <label htmlFor="email" className="auth-label">
                Email
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate card-field"
                value={form.password}
                onChange={formHandler}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="card-action">
            <button className="btn enter" onClick={enterHandler}>
              Войти
            </button>
            <button className="btn regist" onClick={registHandler}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
