import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setUsers } from '../../redux/Actions/UserActions';

function Table() {
  const users = useSelector((state) => state.userState.users);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    const userToDelete = users[index];
    dispatch(deleteUser(userToDelete.id));
  };

  const handleEdit = (index) => {
    const updatedUsers = [...users];
    const editingUser = updatedUsers[index];
    dispatch(setUsers(updatedUsers)); // если нужно сохранить порядок
    dispatch({ type: 'SET_EDITING_USER', payload: editingUser }); // временный action
  };

  return (
    <div>
      <h2>Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>№</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(index)} style={{ marginRight: '8px' }}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;