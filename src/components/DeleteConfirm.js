import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteNote } from '@/action'
import { useRouter } from "next/navigation";

export default function DeleteConfirm(props) {
  const router = useRouter();
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
          <Button color='secondary' onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(id)} autoFocus
            color="red">
            Delete note
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}