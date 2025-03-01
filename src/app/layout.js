import * as React from "react";
import AppTheme from "../components/root/AppTheme";
import Header from "../components/root/Header";
import DrawerHeader from "../components/Sidebar/DrawerHeader";
import Note from "@/app/note/Note";
import Box from '@mui/material/Box';
import useSWR, { SWRConfig } from 'swr'

export default async function RootLayout({ children }) {
  return (
    // <SWRConfig
    //   value={{
    //     refreshInterval: 5000,
    //     fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    //   }}
    // >
    <AppTheme>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AppTheme>
    // </SWRConfig >
  );
}
