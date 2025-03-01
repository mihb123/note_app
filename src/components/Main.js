'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { QuickUpdate } from "@/action";
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
  // const characters = editor?.storage?.characterCount?.characters()
  // const result = editor?.getJSON()
  function handleUpdate() {
    const now = new Date()
    const result = editor?.getJSON()
    item.content = JSON.stringify(result)
    item.title = titleValue
    item.updateAt = now.getTime()
    QuickUpdate(item)
  }
  console.log("render Main")
  return (
    <>
      <Box sx={{ width: "100%", mb: 2 }}>
        <input name='id' value={id} type='hidden' sx={{ mb: 2 }} />
        <input name='isPin' value={isPin} type='hidden' sx={{ mb: 2 }} />
        <input name='closed' value={closed} type='hidden' sx={{ mb: 2 }} />
        <input name='updateAt' value={updatedAt} type='hidden' sx={{ mb: 2 }} />

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