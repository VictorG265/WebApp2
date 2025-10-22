import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import Form from './components/Form';
import Table from './components/Table';
import EditModal from './components/EditModal';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUser } from './redux/Actions/UserActions';
import { setCurrentUser, logoutUser } from './redux/Actions/UserActions';
import { useNavigate } from 'react-router-dom';




function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.currentUser);
  const navigate = useNavigate();


  return (
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
            <div className="App">
              <h1>User Management</h1>
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
  );
}

export default App;