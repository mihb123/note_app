import * as React from "react";
import Header from "../components/root/Header";
import DrawerHeader from "../components/Sidebar/DrawerHeader";
import Note from "@/app/note/Note";
import Box from '@mui/material/Box';
import { Providers } from "@/app/components/root/Provider";

export default async function Layout({ children }) {
  return (
    <>
      <Providers>
        <Header />
        <Box sx={{ display: 'flex', mt: -2 }}>
          <Note />
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      </Providers >
    </>
  );
}
