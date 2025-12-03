import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, deleteUser, updateUser, logoutUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, LinearProgress } from '@mui/material';

import Form from '../components/Form';
import UserTable from '../components/Table';
import EditModal from '../components/EditModal';
import { useThemeMode } from '../../context/ThemeContext';
import useLoading from '../../hooks/useLoading';

function UserPage() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const users = useSelector((state) => state.userState.users);
  const currentUser = useSelector((state) => state.userState.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toggleTheme } = useThemeMode();
  const { loading, withLoading } = useLoading();

  return (
    <Box sx={{ minHeight: '100vh', p: 2 }}>
      {loading && (
        <LinearProgress
          variant="indeterminate"
          sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 2000 }}
        />
      )}

      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" onClick={toggleTheme} sx={{ mb: 2 }}>
        Переключить тему
      </Button>

      <Box sx={{ textAlign: 'right', mb: 2 }}>
        <Typography variant="body1" component="span">
          Вы вошли как: <strong>{currentUser.name}</strong>
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            withLoading(() => {
              dispatch(logoutUser());
              navigate('/login');
            });
          }}
          sx={{ ml: 2 }}
        >
          Выйти
        </Button>
      </Box>

      <Form
        onAddUser={(user) => withLoading(() => dispatch(addUser(user)))}
        onUpdateUser={(user) =>
          withLoading(() => {
            dispatch(updateUser(user));
            setEditingIndex(null);
          })
        }
        editingUser={editingIndex !== null ? users[editingIndex] : null}
      />

      <UserTable
        users={users}
        onDelete={(index) =>
          withLoading(() => {
            dispatch(deleteUser(users[index].id));
            if (editingIndex === index) setEditingIndex(null);
          })
        }
        onEdit={(index) => {
          setEditingIndex(index);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <EditModal
          user={users[editingIndex]}
          onConfirm={(updatedUser) =>
            withLoading(() => {
              dispatch(updateUser(updatedUser));
              setEditingIndex(null);
              setIsModalOpen(false);
            })
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Box>
  );
}

export default UserPage;