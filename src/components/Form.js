import React, { useState, useEffect } from 'react';

function Form({ onAddUser, onUpdateUser, editingUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

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
    if (editingUser) {
      onUpdateUser(formData);
    } else {
      onAddUser(formData);
    }
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="FirstName" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="LastName" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <button type="submit" style={{ backgroundColor: editingUser ? 'orange' : 'red', color: 'white' }}>
        {editingUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}

export default Form;