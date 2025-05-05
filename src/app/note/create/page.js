'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Grow, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createNote, fetchNotes } from '@/app/action'
import { TiptapEditor, Editor } from '../../components/Tiptap/TiptapEditor';
import { useAuth } from '@/app/hooks/useAuth';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';

export default function CreateNote() {
  const { enqueueSnackbar } = useSnackbar();
  const editor = Editor();
  const titleRef = React.useRef(null);
  const { userId } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    if (!titleRef.current?.value?.trim()) {
      enqueueSnackbar("Title is required", { variant: "error" });
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const newData = {
      id: Math.random().toString(36).substr(2, 9),
      title: titleRef.current.value,
      content: JSON.stringify(editor.getJSON()),
      userId: userId || null,
      isPin: false,
      closed: false
    };

    try {
      mutate('/notes', (current = []) => [newData, ...current], {
        optimisticData: (current = []) => [newData, ...current],
        rollbackOnError: true,
        revalidate: false,
      });

      await createNote(newData);
      enqueueSnackbar("Created successfully", { variant: "success" });
      // Reset form
      titleRef.current.value = '';
      editor.commands.clearContent();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Fail to create note", { variant: "error" });
    } finally {
      setIsSubmitting(false);
      await mutate('/notes');
    }
  }, [editor, userId, enqueueSnackbar]);

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <TextField
        fullWidth
        multiline
        label="Title"
        inputRef={titleRef}
        required
        minRows={1}
        variant="outlined"
        name="title"
        placeholder='Leave a title'
        sx={{ mb: 2 }}
        aria-required="true"
      />

      <TiptapEditor editor={editor} />

      <Button
        variant="contained"
        onClick={handleSubmit}
        endIcon={<SendIcon />}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </Box>
  )
}