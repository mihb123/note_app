'use client'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ColorModeSelect from './ColorModeSelect';

function Header() {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            App Note
          </Typography>
          <ColorModeSelect sx={{
            position: 'fixed', top: '1rem', right: '1rem'
          }} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;