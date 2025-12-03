import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';

function Form({ onAddUser, onUpdateUser, editingUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Заполняем форму при редактировании
  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      if (editingUser) {
        onUpdateUser(formData);   // вызываем пропс
      } else {
        const newUser = { ...formData, id: Date.now() };
        onAddUser(newUser);       // вызываем пропс
      }
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          {editingUser ? 'Update User' : 'Add User'}
        </Button>
      </Box>
    </Paper>
  );
}

export default Form;