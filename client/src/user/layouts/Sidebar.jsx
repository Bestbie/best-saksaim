import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ open, toggleSidebar, role }) {
  const sidebarWidth = 240;
  const navigate = useNavigate();

  const getMenuItems = () => {
    switch (role) {
      case 'user':
        return [
          { text: 'Dashboard', path: '/user/dashboard' },
          // { text: 'ผู้ใช้งาน', path: '/admin/user/index' }, // Ensure this matches the route
          { text: 'แบบประเมิน', path: '/user/evaluations/index' }, // Ensure this matches the route
          { text: 'Logout', path: '/logout' },
        ];
      default:
        return [];
    }
  };

  const handleListItemClick = async (path) => {
    console.log(`${path} clicked`);

    if (path === '/logout') {
      try {
        const response = await fetch('http://localhost:8080/login/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          navigate('/login');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    } else {
      navigate(path);
    }
    
    toggleSidebar();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={toggleSidebar}
      sx={{
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {getMenuItems().map(({ text, path }) => (
          <ListItem button key={text} onClick={() => handleListItemClick(path)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
