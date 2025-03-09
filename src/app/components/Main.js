'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { QuickUpdate } from "@/app/action";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { TiptapEditor, Editor } from './Tiptap/TiptapEditor';
import { getContent } from '@/app/utils/function';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';

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

  const { enqueueSnackbar } = useSnackbar();

  async function handleUpdate() {
    // await mutate('notes');
    const now = new Date()
    const result = editor?.getJSON()
    // item.content = JSON.stringify(result)
    // item.title = titleValue
    // item.updateAt = now.getTime()
    const newItem = {
      ...item,
      title: titleValue,
      content: JSON.stringify(result),
      updateAt: now.getTime(),
    }
    mutate(
      'notes',
      (notes = []) => (notes.map(e => (e.id === newItem.id) ? newItem : e)),
      {
        optimisticData: (notes = []) => (notes.map(e => (e.id === newItem.id) ? newItem : e)),
        rollbackOnError: true, // Quay lại dữ liệu cũ nếu có lỗi
        populateCache: true, // Lưu vào cache SWR
        revalidate: false, // Không fetch lại ngay lập tức
      }
    );

    try {
      await QuickUpdate(newItem); // Gửi lên server
      await mutate('notes');
      await mutate(`notes/${item.id}`);

    } catch (error) {
      console.error(error);
      enqueueSnackbar("Fail to update note", { variant: "error" });
    }


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