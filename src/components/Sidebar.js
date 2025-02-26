'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import NoteCard from './NoteCard';
import DrawerHeader from './DrawerHeader';

export default function Sidebar(props) {
    console.log("render Sidebar")
    const data = props.data
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
                    {data.map((e, index) => (
                        <ListItem key={e.title} disablePadding>
                            <ListItemButton href={`/note/${e.id}`}>
                                <NoteCard data={e} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box
                    sx={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "10px", cursor: "ew-resize", zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                    onMouseDown={startResizing}
                />
            </Drawer >
        </>
    );
}