import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../../redux/Actions/UserActions';

function Form() {
  const dispatch = useDispatch();
  const editingUser = useSelector((state) =>
    state.userState.editingUser || null
  );
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Заполняем форму при редактировании
  React.useEffect(() => {
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
        dispatch(updateUser(formData));
      } else {
        const newUser = {
          ...formData,
          id: Date.now()
        };
        dispatch(addUser(newUser));
      }
      setFormData({ firstName: '', lastName: '', email: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="FirstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="LastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit" style={{ backgroundColor: 'red', color: 'white' }}>
        {editingUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}

export default Form;
