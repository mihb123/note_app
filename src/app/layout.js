import * as React from "react";
import AppTheme from "./components/root/AppTheme";
import { AuthProvider } from "@/app/hooks/useAuth";
import { verifySession } from "@/app/utils/session"
import { fetchNotes } from "@/app/action";
import { fetchUserId } from "./action/auth";
import { SWRProvider } from "./components/root/SWRConfig";

export default async function RootLayout({ children }) {
  const notes = await fetchNotes();
  const userId = await verifySession() || null
  const user = fetchUserId(userId)

  return (
    <SWRProvider fallback={{
      "/notes?_sort=updateAt&_order=DESC": notes,
      [`/user/${userId}`]: user
    }}>
      <AuthProvider userId={userId}>
        <AppTheme>
          <html lang="en">
            <body>
              {children}
            </body>
          </html>
        </AppTheme>
      </AuthProvider>
    </SWRProvider >
  )
}
