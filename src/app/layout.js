import * as React from "react";
import AppTheme from "./components/root/AppTheme";
import { AuthProvider } from "@/app/hooks/useAuth";
import { verifySession } from "@/app/utils/session"
import { fetchNotes } from "@/app/action";
import { fetchUserId } from "./action/auth";
import { SWRProvider } from "./components/root/SWRConfig";
import { Suspense } from 'react';

export default async function RootLayout({ children }) {
  const userId = await verifySession() || process.env.userID;
  const user = fetchUserId(userId)
  const notes = await fetchNotes(userId);
  return (
    <SWRProvider fallback={{
      '/notes': notes,
      [`/users/${userId}`]: user
    }}>
      <AuthProvider userId={userId}>
        <AppTheme>
          <html lang="en">
            <body>
              <Suspense fallback={(<h2>🌀 Loading...</h2>)}>
                {children}
              </Suspense>
            </body>
          </html>
        </AppTheme>
      </AuthProvider>
    </SWRProvider >
  )
}
