'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { QuickUpdate } from "@/app/action";
import { Button, Grid2 as Grid } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { TiptapEditor, Editor } from './Tiptap/TiptapEditor';
import { mutate } from 'swr';
import { useSnackbar } from 'notistack';
import SharePanel from './SharePanel';
import { fetchShareUser } from '@/app/action/shareNote';

export default function Main({ item }) {
  const { id, title, content, isPin, closed } = item;
  const [titleValue, setTitleValue] = React.useState(title);
  const [hide, setHide] = React.useState('none');
  const [openPanel, setOpenPanel] = React.useState(false)
  const [shareUsers, setShareUsers] = React.useState([])
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
    const result = editor?.getJSON()
    const newItem = {
      ...item,
      title: titleValue,
      content: JSON.stringify(result),    }
    mutate(
      '/notes',
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
      enqueueSnackbar("Update successfully", { variant: "success" });
      await mutate('/notes');
      await mutate(`/notes/${item.id}`);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Fail to update note", { variant: "error" });
    }
  }
  async function clickShareButton() {
    setOpenPanel(true)
    const result = await fetchShareUser(id)
    setShareUsers(result);
  }
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mb: 2 }}>
        <Grid container spacing={2}>
          <Grid size="grow">
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
          </Grid>
          <Grid>
            <Button
              sx={{ mb: 2, marginLeft: "auto" }}
              variant="contained"
              onClick={ clickShareButton }
            >
              Share
            </Button>
          </Grid>
        </Grid>
        <TiptapEditor
          editor={editor}
        />
        <SharePanel openPanel={openPanel} setOpenPanel={setOpenPanel} noteId={id} shareUsers={shareUsers} />
      </Box>
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
      
    </>
  );
}