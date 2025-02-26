'use client'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Main({ item }) {
  const note = item
  const [title, setTitle] = React.useState(note.title)
  const [content, setContent] = React.useState(note.content);

  const updateTitle = async (title, id) => {
    try {
      const response = await fetch("/api", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title }),
      });
      if (!response.ok) throw new Error("Failed to update title");
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  const updateContent = async (content, id) => {
    try {
      const response = await fetch("/api", {
        method: "PATCH",
        body: JSON.stringify({ id, content }),
      });
      if (!response.ok) throw new Error("Failed to update content");
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  console.log('rendered Main')

  React.useEffect(
    () => {
      setTitle((t) => note.title)
      setContent((c) => note.content)
    }, [note.id]
  )

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: '100%', marginBottom: 2 }}>
        <TextField fullWidth multiline label="Title" id="Title" minRows={1}
          variant="standard"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)

          }} />
      </Box>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <TextField
          id="Content"
          fullWidth
          multiline
          minRows={1}
          label="Content" variant="standard"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);

          }}
        />
      </Box>
    </>

  );
}