import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function AuthModal({ onAuthSuccess }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Простейшая проверка (можно заменить на API-запрос)
    if (formData.username === 'admin' && formData.password === '1234') {
      onAuthSuccess();       // обновляем состояние авторизации
      navigate('/');         // переходим на защищённую страницу
    } else {
      alert('Неверные данные');
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <h2>Авторизация</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;