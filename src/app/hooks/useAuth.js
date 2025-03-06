"use client"
import useSWR from 'swr'
import { createSession, decrypt, deleteSession } from '@/app/utils/session'
import { fetchUserByEmail } from "@/app/action/auth"
import { redirect } from 'next/navigation';
import { createContext, useContext } from "react";
import { SelectedItemProvider } from './useSelectedItem';

const AuthContext = createContext(undefined)

export function AuthProvider({ userId, children }) {
  const { data, error, mutate } = useSWR(userId ? `/user/${userId}` : null, { suspense: true, fallbackData: [] }, { revalidateIfStale: false, revalidateOnFocus: false });

  const loading = !data && !error
  const loggedIn = !error && data?.id

  const login = async (email, password) => {
    // Thực hiện đăng nhập
    const data = await fetchUserByEmail(email)
    if (!data) {
      console.log("Không tồn tại", email)
      return false
    }
    const ePassword = await decrypt(data[0].password)
    const isMatch = ePassword.password == password;
    if (!isMatch) {
      console.log("Sai mật khẩu");
      return false
    }
    console.log("Đăng nhập thành công");
    await createSession(data[0].id)
    // Cập nhật cache SWR
    mutate()
    return true
  }

  const logout = async () => {
    // Thực hiện đăng xuất
    await deleteSession()
    // Cập nhật cache SWR
    mutate(null)
    redirect('/sign-in')
  }
  return <AuthContext.Provider value={{ userId, user: data, loggedIn, loading, login, logout }}>
    {/* <SelectedItemProvider> */}
    {children}
    {/* </SelectedItemProvider> */}
  </AuthContext.Provider>

}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth phải được sử dụng trong AuthProvider")
  }
  return context
}

// export default function useAuth(id) {
//   const baseUrl = process.env.NEXT_PUBLIC_SERVER

//   const { data, error, mutate } = useSWR(id ? `${baseUrl}/user/${id}` : null, { suspense: true });
//   const loading = !data && !error
//   const loggedIn = !error && data?.id
//   const login = async (email, password) => {
//     // Thực hiện đăng nhập
//     const data = await fetchUserByEmail(email)
//     if (!data) {
//       console.log("Không tồn tại", email)
//       return false
//     }
//     const ePassword = await decrypt(data[0].password)
//     const isMatch = ePassword.password == password;
//     if (!isMatch) {
//       console.log("Sai mật khẩu");
//       return false
//     }
//     console.log("Đăng nhập thành công");
//     await createSession(data[0].id)
//     // Cập nhật cache SWR
//     mutate()
//     return true
//   }

//   const logout = async () => {
//     // Thực hiện đăng xuất
//     await deleteSession()
//     // Cập nhật cache SWR
//     mutate(null)
//     redirect('/sign-in')
//   }

//   return {
//     user: data,
//     loading,
//     loggedIn,
//     login,
//     logout,
//   }
// }

