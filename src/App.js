import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import AuthModal from './views/components/AuthModal';
import Form from './views/components/Form';
import Table from './views/components/Table';
import EditModal from './views/components/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './redux/slices/themeSlice';
import {
  addUser,
  deleteUser,
  updateUser,
  setCurrentUser,
  logoutUser,
} from './redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';




function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state) => state.userState.users);
  const theme = useSelector((state) => state.themeState.theme);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.currentUser);
  const navigate = useNavigate();
  console.log('Текущая тема:', theme);

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route
          path="/login"
          element={
          <AuthModal/>
        }
        />
        <Route
          path="/"
          element={
            currentUser ? (
              <div className={'App ${theme}'}>
                <h1>User Management</h1>
                <button onClick={() => dispatch(toggleTheme())}>
                  Переключить тему
                </button>
                {currentUser && (
                  <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <span>Вы вошли как: <strong>{currentUser.name}</strong></span>
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                        navigate('/login');
                      }}
                      style={{ marginLeft: '10px' }}
                    >
                      Выйти
                    </button>
                  </div>
                )}

                <Form
                  onAddUser={(user) => dispatch(addUser(user))}
                  onUpdateUser={(user) => {
                    dispatch(updateUser(user));
                    setEditingIndex(null);
                  }}
                  editingUser={editingIndex !== null ? users[editingIndex] : null}
                />
                <Table
                  users={users}
                  onDelete={(index) => {
                    dispatch(deleteUser(users[index].id));
                    if (editingIndex === index) setEditingIndex(null);
                  }}
                  onEdit={(index) => {
                    setEditingIndex(index);
                    setIsModalOpen(true);
                  }}
                />
                {isModalOpen && (
                  <EditModal
                    user={users[editingIndex]}
                    onConfirm={(updatedUser) => {
                      dispatch(updateUser(updatedUser));
                      setEditingIndex(null);
                      setIsModalOpen(false);
                    }}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;