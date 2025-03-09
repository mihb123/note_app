'use client'
import NoteCard from './NoteCard';
import { ListItem, ListItemButton, Typography } from '@mui/material';

const NoteSection = ({ title, count, notes, onPin, onClose }) => (
  <>
    <ListItem>
      <Typography color="secondary">{`${title} (${count})`}</Typography>
    </ListItem>
    {notes.map((note) => (
      <ListItem key={note.id} disablePadding>
        <ListItemButton>
          <NoteCard
            data={note}
            HandlePinAction={() => onPin(note)}
            CloseAction={() => onClose(note)}
          />
        </ListItemButton>
      </ListItem>
    ))}
  </>
);

export default NoteSection;