'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createNote } from '@/app/action'
import { TiptapEditor, Editor } from '../../components/Tiptap/TiptapEditor';
import { useEditorState } from '@tiptap/react'

export default function CreateNote() {

  const editor = Editor()
  const now = new Date()

  const result = useEditorState({
    editor,
    selector: () => editor?.getJSON(),
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const pin = formData.get('isPin') === 'true'
    const close = formData.get('closed') === 'true'

    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      isPin: pin,
      updateAt: formData.get('updateAt'),
      closed: close
    }
    await createNote(data)
    editor.commands.setContent("")
    document.getElementById('Title').value = ''
  }
  return (
    <>
      <Box component='form' onSubmit={handleSubmit} sx={{ width: "100%", mb: 2 }}>
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
        <input name='content' value={JSON.stringify(result)} sx={{ mb: 2 }} type='hidden' />
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
        >Save</Button>
      </Box >
    </>
  )
}

