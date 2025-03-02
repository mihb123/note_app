'use server'
import cookies from 'next/headers'
import { createSession } from '@/app/utils/session'

export async function CreateUser(data) {
  // Insert the user into the database or call an Library API
  try {
    const res = await fetch(`${url}/user`, {
      method: "POST",
      body: JSON.stringify(data)
    })
    if (res.ok) {
      console.log('User created successfully:')
      const result = await res.json()
    }
  }
  catch (error) {
    console.error('Error:', error);
  }

  await createSession(result.name, result.email)
  redirect('/')
}

