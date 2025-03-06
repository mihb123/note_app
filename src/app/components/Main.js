'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { QuickUpdate } from "@/app/action";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { TiptapEditor, Editor } from './Tiptap/TiptapEditor';
import { getContent } from '@/app/utils/function';

export default function Main({ item }) {
  const { id, title, content, isPin, updateAt, closed } = item;
  const [titleValue, setTitleValue] = React.useState(title);
  const [hide, setHide] = React.useState('none');
  const [updatedAt, setUpdatedAt] = React.useState(updateAt);

  let output = null
  if (content) {
    output = JSON.parse(content)
  }

  const editor = Editor({
    content: output,
    onUpdate: () => {
      setHide('flex')
    }
  })

  function handleUpdate() {
    const now = new Date()
    const result = editor?.getJSON()
    item.content = JSON.stringify(result)
    item.title = titleValue
    item.updateAt = now.getTime()
    QuickUpdate(item)
  }
  return (
    <>
      <Box sx={{ width: "100%", mb: 2 }}>

        <TextField
          size='Normal'
          fullWidth
          required
          multiline
          label="Title"
          sx={{ mb: 2 }}
          minRows={1}
          variant="outlined"
          name="title"
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value);
            setHide('flex')
          }}
        />

        <TiptapEditor
          editor={editor}
        />
        <Button
          onClick={() => {

            handleUpdate()
            setHide("none")
          }}
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            display: hide
          }}
          autoFocus
        >Save</Button>
      </Box>
    </>
  );
}