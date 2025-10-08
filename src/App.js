import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => setUsers([...users, user]);
  const deleteUser = (index) => setUsers(users.filter((_, i) => i !== index));

  return (
    <div className="App">
      <h1>User Management</h1>
      <Form onAddUser={addUser} />
      <Table users={users} onDelete={deleteUser} />
    </div>
  );
}

export default App;
