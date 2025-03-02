'use client'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ColorModeSelect from './ColorModeSelect';
import { Button, List } from '@mui/material';

function Header() {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            App Note
          </Typography>
          <List sx={{ marginLeft: "auto" }}>
            <Button
              sx={{ mr: 1 }}
              href="/sign-in"
            >Login
            </Button>
            <ColorModeSelect />
          </List>

        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;