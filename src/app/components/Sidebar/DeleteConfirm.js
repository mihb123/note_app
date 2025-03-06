import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteNote } from '@/app/action'
import { red } from "../root/themePrimitives"
import { useTheme } from '@mui/material/styles';

export default function DeleteConfirm(props) {
  const { id, title, open, setOpen } = props

  const handleDelete = (id) => {
    deleteNote(id)
    setOpen(false);
    // router.push("/note/create")
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle >
          {"Are you sure to delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cannot undo this action. Are you sure want to delete this note with title: {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(id)}
            variant='contained'
          // sx={({ theme }) => ({
          //   ...(theme.palette.mode === 'dark' && {
          //     backgroundColor: red[400],
          //     backgroundImage: "none"
          //   }),
          // })}
          >
            Delete note
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}
