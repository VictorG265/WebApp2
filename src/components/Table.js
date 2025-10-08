import React from 'react';

function Table({ users, onDelete }) {
  return (
    <div>
      <h2>Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th><th>FirstName</th><th>LastName</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => onDelete(index)} style={{ backgroundColor: 'red', color: 'white' }}>
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