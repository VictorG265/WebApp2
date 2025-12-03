import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  addUser,
  deleteUser,
  updateUser,
  logoutUser,
} from './redux/slices/userSlice';

import AuthModal from './views/components/AuthModal';
import Form from './views/components/Form';
import UserTable from './views/components/Table';
import EditModal from './views/components/EditModal';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const users = useSelector((state) => state.userState.users);
  const currentUser = useSelector((state) => state.userState.currentUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [themeMode, setThemeMode] = useState('light');
  const muiTheme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // глобальный обработчик с задержкой
  const withLoading = (action) => {
    setLoading(true);
    setTimeout(() => {
      action();
      setLoading(false);
    }, 500);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {/* глобальный индикатор загрузки */}
      {loading && (
        <LinearProgress
          variant="indeterminate"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            
            width: '100%',
            zIndex: 2000,
          }}
        />
      )}
      <Box sx={{ minHeight: '100vh', p: 2 }}>
        <Routes>
          <Route path="/login" element={<AuthModal />} />
          <Route
            path="/"
            element={
              currentUser ? (
                <>
                  <Typography variant="h4" gutterBottom>
                    User Management
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={toggleTheme}
                    sx={{ mb: 2 }}
                  >
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
                    onAddUser={(user) =>
                      withLoading(() => dispatch(addUser(user)))
                    }
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
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
