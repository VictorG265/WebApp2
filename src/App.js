import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';
import EditModal from './components/EditModal';

function App() {
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setEditingIndex(null); // сброс редактирования, если удалили редактируемого
    }
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const confirmEdit = (updatedUser) => {
    const newUsers = [...users];
    newUsers.splice(editingIndex, 1); // удалить старого
    newUsers.push(updatedUser);       // добавить нового
    setUsers(newUsers);
    setEditingIndex(null);
    setIsModalOpen(false);
  };  

  const updateUser = (updatedUser) => {
    const newUsers = [...users];
    newUsers[editingIndex] = updatedUser;
    setUsers(newUsers);
    setEditingIndex(null);
  };

  {isModalOpen && (
    <EditModal
      user={users[editingIndex]}
      onConfirm={confirmEdit}
      onClose={() => setIsModalOpen(false)}
    />
  )}

  return (
    <div className="App">
      <h1>User Management</h1>
      <Form
        onAddUser={addUser}
        onUpdateUser={updateUser}
        editingUser={editingIndex !== null ? users[editingIndex] : null}
      />
      <Table
        users={users}
        onDelete={deleteUser}
        onEdit={(index) => setEditingIndex(index)}
      />
    </div>
  );
}

export default App;