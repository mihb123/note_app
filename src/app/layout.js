import * as React from "react";
import AppTheme from "../components/AppTheme";
import Header from "../components/Header";
import DrawerHeader from "../components/DrawerHeader";

export default async function RootLayout({ children }) {
  return (
    <AppTheme>
      <html lang="en">
        <body>
          <Header />
          <DrawerHeader />
          {children}
        </body>
      </html>
    </AppTheme>
  );
}
