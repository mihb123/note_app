"use client";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ColorModeSelect from './ColorModeSelect';
import { Button, List, Tooltip, tooltipClasses } from '@mui/material';
import { useAuth } from '@/app/hooks/useAuth';
import { useState } from 'react';
import { styled } from '@mui/styles';

function Header({ userId }) {
  const [open, setOpen] = useState(false)
  const { user, loggedIn, logout } = useAuth()
  // mutate(`user/${userId}`)

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: 14,
    },
  }));
  return (
    <>
      <AppBar position="fixed" sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#EFF6FF' : theme.palette.primary.main
      }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div" sx={{ color: (theme) => theme.palette.mode === 'light' ? '#262626' : '#cbdcd8' }}>
            App Note
          </Typography>
          <List sx={{ marginLeft: "auto" }}>
            {loggedIn ? <>
              <BootstrapTooltip title="Click to login" >
                <Button
                  sx={{ mr: 1 }}
                  onClick={() => {
                    setOpen(!open)
                    logout()
                  }}>
                  Hi, {user.name}
                </Button>
              </BootstrapTooltip>
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
      </AppBar>
    </>
  );
}

export default Header;