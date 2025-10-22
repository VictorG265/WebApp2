import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import Form from './components/Form';
import Table from './components/Table';
import EditModal from './components/EditModal';

function App() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const confirmAuth = () => setIsAuthenticated(true);

  return (
    <Routes>
      <Route
        path="/login"
        element={
        <AuthModal
          onAuthSuccess={(user) => {
            setCurrentUser(user);
            confirmAuth();
          }}
        />
      }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <div className="App">
              <h1>User Management</h1>
              <Form
                onAddUser={(user) => setUsers([...users, user])}
                onUpdateUser={(user) => {
                  const newUsers = [...users];
                  newUsers[editingIndex] = user;
                  setUsers(newUsers);
                  setEditingIndex(null);
                }}
                editingUser={editingIndex !== null ? users[editingIndex] : null}
              />
              <Table
                users={users}
                onDelete={(index) => {
                  setUsers(users.filter((_, i) => i !== index));
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
                    const newUsers = [...users];
                    newUsers.splice(editingIndex, 1);
                    newUsers.push(updatedUser);
                    setUsers(newUsers);
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