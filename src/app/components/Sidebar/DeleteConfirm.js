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
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';
import { redirect } from 'next/navigation'

export default function DeleteConfirm({ id, title, open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    mutate(
      '/notes',
      //remote element include id     
      (currentNotes = []) => currentNotes.filter(e => e.id !== id),
      {
        optimisticData: (currentNotes = []) => currentNotes.filter(e => e.id !== id), // Cập nhật tức thì
        rollbackOnError: true, // Quay lại dữ liệu cũ nếu có lỗi
        populateCache: true, // Lưu vào cache SWR
        revalidate: false, // Không fetch lại ngay lập tức
      }
    );
    setOpen(false);

    try {
      await deleteNote(id) 
      enqueueSnackbar("Delete successfully", { variant: "success" });
      await mutate('/notes');
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Fail to delete note", { variant: "error" });
    } finally {
      redirect('/note/create')
    }

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
          >
            Delete note
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  );
}
