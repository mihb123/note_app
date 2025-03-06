'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Grow, Snackbar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createNote, fetchNotes } from '@/app/action'
import { TiptapEditor, Editor } from '../../components/Tiptap/TiptapEditor';
import { useEditorState } from '@tiptap/react'
import { useAuth } from '@/app/hooks/useAuth';
import useSWR, { mutate } from 'swr';
import { useSnackbar } from 'notistack';

export default function CreateNote() {
  const { enqueueSnackbar } = useSnackbar();
  const editor = Editor()
  const result = useEditorState({
    editor,
    selector: () => editor?.getJSON(),
  })
  const { userId } = useAuth()

  const handleSubmit = async () => {
    const now = new Date()
    const title = document.getElementById('Title').value
    const uuid = crypto.randomUUID();
    const shortId = btoa(uuid).replace(/[^a-zA-Z0-9]/g, '').slice(0, 9);
    const newData = {
      id: shortId,
      title: title,
      content: JSON.stringify(result),
      userId: userId || null,
      isPin: false,
      updateAt: now.getTime(),
      closed: false

    }
    mutate(
      'notes',
      (currentNotes = []) => {
        return [newData, ...currentNotes]; // Cập nhật ngay UI
      },
      {
        optimisticData: (currentNotes = []) => [newData, ...currentNotes], // Cập nhật tức thì
        rollbackOnError: true, // Quay lại dữ liệu cũ nếu có lỗi
        populateCache: true, // Lưu vào cache SWR
        revalidate: false, // Không fetch lại ngay lập tức
      }
    );
    editor.commands.setContent("")
    document.getElementById('Title').value = ''


    try {
      await createNote(newData); // Gửi lên server
      await mutate('notes');
      enqueueSnackbar("Created successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Fail to create note", { variant: "error" });
    }

  }
  return (
    <>

      <Box sx={{ width: "100%", mb: 2 }}>
        <TextField
          fullWidth
          multiline
          label="Title"
          id="Title"
          required
          minRows={1}
          variant="outlined"
          name="title"
          placeholder='Leave a title'
          sx={{ mb: 2 }}
        />

        <TiptapEditor
          editor={editor}
        />

        <Button
          variant="contained"
          onClick={() => handleSubmit()}
          endIcon={<SendIcon />}

        >Save</Button>
      </Box >
    </>
  )
}

