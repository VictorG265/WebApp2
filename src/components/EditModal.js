import React, { useState, useEffect } from 'react';

function EditModal({ user, onConfirm, onClose }) {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            First name:
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          </p>
          <p>
            Last name:
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          </p>
          <p>
            email:
            <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          </p>
        </div>

        <div>
          <button type="submit">Confirm</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EditModal;
