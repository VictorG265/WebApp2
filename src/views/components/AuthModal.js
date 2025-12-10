import React, { useState } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import UserAPI from '../../api/services';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/slices/userSlice';

function AuthModal({ onAuthSuccess }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      const success = UserAPI.register({
        username: formData.username,
        password: formData.password,
        name: formData.name || formData.username
      });
      if (success) {
        alert('Регистрация успешна! Теперь войдите.');
        setIsRegistering(false);
        setFormData({ username: '', password: '', name: '' });
      } else {
        alert('Пользователь с таким логином уже существует.');
      }
    } else {
      const matchedUser = UserAPI.authenticate(formData.username, formData.password);
      if (matchedUser) {
        dispatch(setCurrentUser(matchedUser));
        navigate('/');
      } else {
        alert('Неверные данные');
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <h2>{isRegistering ? 'Регистрация' : 'Авторизация'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              required
            />
          )}
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Логин"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
          />
          <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
        </form>
        <p style={{ marginTop: '10px' }}>
          {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Войти' : 'Регистрация'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;