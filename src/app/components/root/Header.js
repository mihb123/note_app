"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ColorModeSelect from './ColorModeSelect';
import { Button, List, MenuItem, Select } from '@mui/material';
import { useAuth } from '@/app/hooks/useAuth';
import { useState } from 'react';
import { mutate } from 'swr';

function Header({ userId }) {
  const [open, setOpen] = useState(false)
  const { user, loggedIn, logout } = useAuth()
  mutate(`user/${userId}`)
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            App Note
          </Typography>
          <List sx={{ marginLeft: "auto" }}>
            {loggedIn ? <>
              <Button
                sx={{ mr: 1 }}
                onClick={() => {
                  setOpen(!open)
                  logout()
                }}>
                Hi, {user.name}
              </Button>
            </> :
              <Button
                sx={{ mr: 1 }}
                href="/sign-in"
              >Login
              </Button>
            }
            <ColorModeSelect />
          </List>
        </Toolbar>
      </AppBar>,
    </>
  );
}

export default Header;