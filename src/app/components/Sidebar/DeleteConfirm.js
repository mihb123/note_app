import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteNote } from '@/app/action'
import { useSnackbar } from 'notistack';
import { redirect } from 'next/navigation'
import { useSWRConfig } from 'swr';

export default function DeleteConfirm({ id, title, open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const { cache, mutate } = useSWRConfig();

  const handleDelete = async (id) => {
    const updateNote = (pages = []) => pages.map(page => page.filter(e => e.id !== id));

    for (const key of cache.keys()) {
      if (key.includes('$inf$@')) {
        const v = cache.get(key)
        console.log('key', key, v)
        mutate(key, updateNote, {
          optimisticData: updateNote,
          rollbackOnError: true, // Quay lại dữ liệu cũ nếu có lỗi
          populateCache: true, // Lưu vào cache SWR
          revalidate: false, // Không fetch lại ngay lập tức
        });
      }
    }
    setOpen(false);

    try {
      await deleteNote(id) 
      enqueueSnackbar("Delete successfully", { variant: "success" });
      for (const key of cache.keys()) {
        if (key.includes('"/notes"')) {
          await mutate(key);
        }
      }
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
