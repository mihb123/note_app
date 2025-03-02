import * as React from "react";
import AppTheme from "./components/root/AppTheme";
import Header from "./components/root/Header";
import DrawerHeader from "./components/Sidebar/DrawerHeader";
import Note from "@/app/note/Note";
import Box from '@mui/material/Box';
import useSWR, { SWRConfig } from 'swr'
import { getUser } from "./action/user";

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (

    <AppTheme>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </AppTheme>

  );
}
