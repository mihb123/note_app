'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import NoteCard from './NoteCard';
import DrawerHeader from './DrawerHeader';
import { useRouter } from "next/navigation";
import { Button, ListItemText, Skeleton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { fetchNotes, QuickUpdate } from '@/app/action';
import useSWR from 'swr';
import Loading from '@/app/note/loading';

export default function Sidebar({ note }) {
  const { data, mutate } = useSWR('notes', fetchNotes, { revalidateOnFocus: true, fallbackData: note })
  const router = useRouter();

  React.useEffect(() => {
    mutate('notes')
  }, [note])
  // console.log("data", data)
  let openNotes, closeNotes
  if (typeof data != 'object') {
    openNotes = note?.filter(e => !e.closed)
    closeNotes = note?.filter(e => e.closed)
  } else {
    openNotes = data?.filter(e => !e.closed)
    closeNotes = data?.filter(e => e.closed)
  }

  const numberClose = closeNotes?.length
  const numberOpen = openNotes?.length
  const [closeSide, setCloseSide] = React.useState(false)

  const pinData = openNotes?.filter(e => e.isPin)
  const unpin = openNotes?.filter(e => !e.isPin)
  const [pinnedData, setPinnedData] = React.useState(pinData)
  const [unpinnedData, setUnpinnedData] = React.useState(unpin)

  function HandlePinAction(note) {
    // set state
    if (note.isPin) {
      setPinnedData(prev => prev.filter(n => n.id !== note.id))
      setUnpinnedData(prev => [...prev, note])
    } else {
      setPinnedData(prev => [...prev, note])
      setUnpinnedData(prev => prev.filter(n => n.id !== note.id))
    }

    // set lại data
    if (note.isPin) {
      note.isPin = false;
    } else {
      note.isPin = true;
    }
    QuickUpdate(note)
  }

  async function HandleCloseAction(note) {
    note.closed = !note.closed;

    mutate((data) => {
      if (!data) return note.map((e) =>
        e.id === note.id ? { ...e, closed: note.closed } : e
      );

      return data.map((e) =>
        e.id === note.id ? { ...e, closed: note.closed } : e
      );
    },
      {
        // optimisticData: (currentNotes) => {
        //   if (!currentNotes) return [];
        //   return currentNotes.map((e) =>
        //     e.id === note.id ? { ...e, closed: note.closed } : e
        //   );
        // },
        // populateCache: true,
        revalidate: false,
      })

    await QuickUpdate(note)

  }

  const [drawerWidth, setDrawerWidth] = React.useState(300);
  const [isResizing, setIsResizing] = React.useState(false);
  const handleMouseMove = (event) => {
    if (isResizing) {
      const newWidth = Math.max(80, event.clientX);
      setDrawerWidth(newWidth);
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const startResizing = (event) => {
    event.preventDefault();
    setIsResizing(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", stopResizing);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflowY: 'auto', // Ensure scrolling works
            scrollbarWidth: 'none', // Hide scrollbar in Firefox
            '&::-webkit-scrollbar': {
              width: 0, // Hide scrollbar in Chrome, Safari
              display: 'none',
            },
          },
        }}
        variant="permanent"
      >
        <DrawerHeader />
        <List>
          <ListItem sx={{
            display: "flex",
            justifyContent: 'space-between'
          }}
          >
            <Button variant="contained"

              onClick={() => router.push('/note/create')}
              startIcon={<AddCircleIcon />}>
              <Typography sx={{ mt: 0.5 }}>Create</Typography>
            </Button>
            {closeSide ? <>
              <Button variant="outlined"
                onClick={() => setCloseSide(false)}
              >
                <Typography sx={{ mt: 0.6 }}>Open ({numberOpen})</Typography>
              </Button>
            </> :
              <>
                <Button variant="outlined"
                  onClick={() => setCloseSide(true)}
                >
                  <Typography sx={{ mt: 0.6 }}>Closed ({numberClose})</Typography>
                </Button>
              </>
            }
          </ListItem>
          {closeSide ?
            <>
              {closeNotes.map((e, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton >
                    <NoteCard
                      data={e}
                      HandlePinAction={HandlePinAction}
                      CloseAction={HandleCloseAction}
                      closeSide={closeSide}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
            :
            <>
              {pinData?.length != 0 &&
                <>
                  <ListItem >
                    <Typography color='secondary'>Pinned ({pinData?.length})</Typography>
                  </ListItem>

                  {pinData?.map((e, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton >
                        <NoteCard
                          data={e}
                          HandlePinAction={HandlePinAction}
                          CloseAction={HandleCloseAction}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}

                </>
              }
              {unpin?.length != 0 &&
                <>
                  <ListItem>
                    <Typography color='secondary'>Notes ({unpin?.length})</Typography>
                  </ListItem>
                  {unpin?.map((e, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton >
                        <NoteCard
                          data={e}
                          HandlePinAction={HandlePinAction}
                          CloseAction={HandleCloseAction}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
              }
            </>
          }

        </List>
        <Box
          sx={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: "6px", cursor: "w-resize", zIndex: 1000, backgroundColor: "rgba(202, 182, 182, 0.1)",
            "&:focus": { // Sửa lại thành "&:hover"
              backgroundColor: "grey",
              // cursor: "pointer"
            },
          }}
          onMouseDown={startResizing}
        />
      </Drawer >
    </>
  );
}