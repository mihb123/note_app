'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createNote } from '@/action'
import { TiptapEditor, Editor } from '../../../components/Tiptap/TiptapEditor';

export default function CreateNote() {

  function resetData() {
    editor.commands.setContent("")
  }
  const editor = Editor()
  const now = new Date()
  let result = editor?.getJSON()

  return (
    <>
      <Box component='form' action={createNote} sx={{ width: "100%", mb: 2 }}>
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
        <input name='content' value={JSON.stringify(result)} type='hidden' sx={{ mb: 2 }} />
        <TiptapEditor
          editor={editor}
        />

        <input name='isPin' value={false} type='hidden' sx={{ mb: 2 }} />
        <input name='closed' value={false} type='hidden' sx={{ mb: 2 }} />
        <input name='updateAt' value={now.getTime()} type='hidden' sx={{ mb: 2 }} />

        <Button
          variant="contained"
          type='submit'
          endIcon={<SendIcon />}
          onClick={() => setTimeout(resetData, 400)}
        >Save</Button>
      </Box >
    </>
  )
}

