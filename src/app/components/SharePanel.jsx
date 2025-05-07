'use client'
import React from 'react';
import { Box, Typography, TextField, Button, Avatar, Dialog, DialogContent, List, ListItem, ListItemButton} from '@mui/material';
import { addUserToShareNote, removeShareUser } from '@/app/action/shareNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';

export default function SharePanel({ openPanel, setOpenPanel, noteId, shareUsers }) {
  const [hoveredUser, setHoveredUser] = React.useState(null);
  const [users, setUsers] = React.useState([])
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const userData = shareUsers.map((user) => user?.User)
    setUsers(userData);
  },[shareUsers])

  async function handleAddUser(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const data = {
      email: email,
      noteId: noteId
    }
    e.target.email.value = "";
    const result = await addUserToShareNote(data);
    if (result == undefined) {
      enqueueSnackbar(`Fail to share note for ${email}`, { variant: "error" });
    } else {
      const newUser = result.User
      setUsers(prev => [...prev, newUser]);
      enqueueSnackbar(`Successful to share note for ${email}`, { variant: "success" });
    }
  }
  async function handleDeleteShareUser(id, noteId) {
    const result = await removeShareUser(id, noteId)
    if (result !== undefined) {
      setUsers(users => users.filter(u => u.id !== id))
      enqueueSnackbar(`Successful to remove user`, { variant: "success" });
    } else {
      enqueueSnackbar(`Fail to remove user`, { variant: "error" });
    }
  }

  return (
    <Dialog
      open={openPanel}
      onClose={() => setOpenPanel(false)}
      fullWidth maxWidth="sm"
    >
      <DialogContent sx={{ padding: 4 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>Share</Typography>
        <Box component="form" onSubmit={handleAddUser} display="flex" gap={1} mb={2}>
          <TextField
            placeholder="Add Email"
            size="small"
            type="email"
            name='email'
            required
            fullWidth
          />
          <Button type="submit" variant="contained">Add</Button>
        </Box>
        <List>
          {users.map((user, i) => {
            const id = user?.id || i;
            const email = user?.email;
            const firstL = email?.charAt(0);
            return (
              <ListItem key={id} disablePadding
                onMouseEnter={() => setHoveredUser(email)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <ListItemButton >
                    <Avatar sx={{ width: 34, height: 34, marginRight: 2 }}>{firstL}</Avatar>
                    <Box>
                    <Typography variant="body2" fontWeight="bold">{email}</Typography>
                      <Typography variant="caption" color="textSecondary">Editor</Typography>
                  </Box>
                  <DeleteIcon
                    color="secondary"
                    sx={{
                      display: hoveredUser === email ? 'inline' : 'none',
                      marginLeft: "auto",
                      fontSize: 20,
                      cursor: 'pointer',
                      "&:hover": { color: "red" },
                    }}
                    onClick={()=>handleDeleteShareUser(id, noteId)}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};