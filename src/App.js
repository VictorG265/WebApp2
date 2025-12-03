import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthModal from './views/components/AuthModal';
import UserPage from './views/pages/UserPage';
import { ThemeModeProvider } from './context/ThemeContext';

function App() {
  const currentUser = useSelector((state) => state.userState.currentUser);

  return (
    <ThemeModeProvider>
      <Routes>
        <Route path="/login" element={<AuthModal />} />
        <Route
          path="/"
          element={currentUser ? <UserPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </ThemeModeProvider>
  );
}

export default App;