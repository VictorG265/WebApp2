import React, { useState } from 'react';

function Form({ onAddUser }) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      onAddUser(formData);
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="FirstName" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="LastName" value={formData.lastName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>Add User</button>
    </form>
  );
}

export default Form;