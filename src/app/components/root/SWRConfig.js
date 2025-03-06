'use client';
import { SWRConfig } from 'swr'

export const SWRProvider = ({ children, fallback }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER
  return <SWRConfig
    value={{
      fetcher: (url) => fetch(`${baseUrl}${url}`).then(res => res.json()),
      revalidateIfStale: false,
      fallback,
      errorRetryCount: 3,
      fallback
    }}>{children}
  </SWRConfig>
};