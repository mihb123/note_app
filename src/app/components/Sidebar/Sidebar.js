'use client'
import React from 'react';
import { useParams, useRouter } from "next/navigation";
import useSWR from 'swr';
import { Box, Drawer, List, ListItem, ListItemButton, Button, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { fetchNotes, QuickUpdate } from '@/app/action';
import NoteCard from './NoteCard';
import DrawerHeader from './DrawerHeader';
import { fetchShareNote } from '@/app/action/shareNote';
import useSWRInfinite from 'swr/infinite'
import { useSWRConfig } from 'swr';

const NoteSection = ({ title, count, notes, onPin, onClose, setSize, size }) => {
  const params = useParams();
  const id = params?.id;
  return (
    <div key={title} className="note-section">
      <ListItem>
        <Typography color="secondary">{`${title} (${count})`}</Typography>
        <Button sx={{ ml: 'auto' }}
        onClick= {() => setSize(size + 1)}
        >
          <Typography color="text.secondary" sx={{ flexGrow: 1 }}>Load more</Typography>
        </Button>
      </ListItem>
      {notes.map((note) => (
        <ListItem key={note.id} disablePadding>
          <ListItemButton selected={id == note.id}>
            <NoteCard
              data={note}
              HandlePinAction={() => onPin(note)}
              CloseAction={() => onClose(note)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </div>
  )
};

export default function Sidebar({ userId, initialNotes, shares }) {
  const { cache } = useSWRConfig();
  const router = useRouter();
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null 
    const key = ["/notes", pageIndex + 1];
    return key;                    
  }
  const { data: Notes = initialNotes, mutate, size, setSize, isLoading } = useSWRInfinite(getKey, ([, page]) => fetchNotes(userId, page));
  const notes = Notes ? [].concat(...Notes) : [];

  if (notes == undefined) {
    console.log('notes is undefined')
  }
  
  const { data: shareNotes = shares } = useSWR('/shareNotes', () => fetchShareNote(userId));
  let data = notes;
  if (shareNotes != undefined) {
    const updatedNotes = shareNotes.map(e => {
      const note = e.Note;
      return {
        ...note,
        closed: false,
        isPin: false
      };
    });

    data = [
      ...notes,
      ...updatedNotes.filter(u => !notes.some(n => n.id === u.id))
    ];
  };

  const [drawerWidth, setDrawerWidth] = React.useState(300);
  const [isResizing, setIsResizing] = React.useState(false);
  const [showClosed, setShowClosed] = React.useState(false);

  const [closedNotes, openNotes] = React.useMemo(() =>
    (data || []).reduce((acc, note) => {
      note.closed ? acc[0].push(note) : acc[1].push(note);
      return acc;
    }, [[], []]),
    [data]
  );

  const [pinnedNotes, unpinnedNotes] = React.useMemo(() =>
    openNotes.reduce((acc, note) => {
      note.isPin ? acc[0].push(note) : acc[1].push(note);
      return acc;
    }, [[], []]),
    [openNotes]
  );

  const handlePin = async (note) => {
    const updatedNote = { ...note, isPin: !note.isPin };
    mutate(data => data.map(n => n.id === note.id ? updatedNote : n), false);
    await QuickUpdate(updatedNote);
  };

  const handleClose = async (note) => {
    const updatedNote = { ...note, closed: !note.closed };
    mutate(data => data.map(n => n.id === note.id ? updatedNote : n), false);
    await QuickUpdate(updatedNote);
  };

  const handleMouseMove = React.useCallback((e) => {
    if (isResizing) {
      const drawerElement = document.querySelector('.MuiDrawer-paper');
      const drawerRect = drawerElement.getBoundingClientRect();
      const newWidth = Math.max(280, e.clientX - drawerRect.left);
      setDrawerWidth(newWidth);
    }
  }, [isResizing]);

  // Resize handler
  React.useEffect(() => {

    const stopResizing = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', stopResizing);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        height: '100vh', // Full viewport height
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          height: '100vh', // Full viewport height
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden', // Hide overflow from container
        }
      }}
      variant="permanent"
    >
      <DrawerHeader />
      <Box sx={{
        // flex: 1,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' }
      }}>
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Button
              variant="contained"
              onClick={() => router.push('/note/create')}
              startIcon={<AddCircleIcon />}
            >
              Create
            </Button>

            <Button
              variant="outlined"
              onClick={() => setShowClosed(!showClosed)}
            >
              {showClosed ? `Open (${openNotes.length})` : `Closed (${closedNotes.length})`}
            </Button>
          </ListItem>

          {showClosed ? (
            <NoteSection
              title="Closed Notes"
              count={closedNotes.length}
              notes={closedNotes}
              onPin={handlePin}
              onClose={handleClose}
              setSize={setSize}
              size={size}
            />
          ) : (
            <>
              {pinnedNotes.length > 0 && (
                <NoteSection
                  title="Pinned"
                  count={pinnedNotes.length}
                  notes={pinnedNotes}
                  onPin={handlePin}
                  onClose={handleClose}
                  setSize={setSize}
                  size={size}
                />
              )}

              {unpinnedNotes.length > 0 && (
                <NoteSection
                  title="Notes"
                  count={unpinnedNotes.length}
                  notes={unpinnedNotes}
                  onPin={handlePin}
                  onClose={handleClose}
                  setSize={setSize}
                  size={size}
                />
              )}
            </>
          )}
        </List>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 6,
          cursor: 'col-resize',
          zIndex: 1000,
          bgcolor: 'divider',
          '&:hover': { bgcolor: 'grey.500' }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true)
        }}
      />
    </Drawer>
  );
}