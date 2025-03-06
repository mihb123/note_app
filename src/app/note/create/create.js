'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createNote, fetchNotes } from '@/app/action'
import { TiptapEditor, Editor } from '../../components/Tiptap/TiptapEditor';
import { useEditorState } from '@tiptap/react'
import { useAuth } from '@/app/hooks/useAuth';
import useSWR, { mutate } from 'swr';

export default function CreateNote() {
  // const { data, mutate } = useSWR('notes', fetchNotes)

  const editor = Editor()
  const result = useEditorState({
    editor,
    selector: () => editor?.getJSON(),
  })
  const { userId } = useAuth()

  const handleSubmit = async () => {
    const now = new Date()
    const title = document.getElementById('Title').value
    const newData = {
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
        return [...currentNotes, newData]; // Cập nhật ngay UI
      },
      {
        optimisticData: (currentNotes = []) => [...currentNotes, newData], // Cập nhật tức thì
        rollbackOnError: true, // Quay lại dữ liệu cũ nếu có lỗi
        populateCache: true, // Lưu vào cache SWR
        revalidate: false, // Không fetch lại ngay lập tức
      }
    );

    try {
      await createNote(newData); // Gửi lên server
      await mutate('notes'); // Sau khi cập nhật xong, fetch lại dữ liệu mới nhất
    } catch (error) {
      console.error(error);
    }
    finally {
      editor.commands.setContent("")
      document.getElementById('Title').value = ''
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

