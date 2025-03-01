import * as React from "react";
import Header from "../../components/root/Header";
import DrawerHeader from "../../components/Sidebar/DrawerHeader";
import Note from "@/app/note/Note";
import Box from '@mui/material/Box';
import useSWR, { SWRConfig } from 'swr'

export default async function Layout({ children }) {
  return (
    <>
      <Header />
      <DrawerHeader />
      <Box sx={{ display: 'flex' }}>
        <Note />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
