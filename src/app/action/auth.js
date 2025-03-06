'use server'
import { createSession } from '@/app/utils/session'
import { redirect } from 'next/navigation'

const url = process.env.NEXT_PUBLIC_SERVER

export async function CreateUser(data) {
  // Insert the user into the database or call an Library API
  try {
    const res = await fetch(`${url}/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (res.ok) {
      const result = await res.json()
      console.log('User created successfully:', result.id)

      await createSession(result.id)
    }
  }
  catch (error) {
    console.error('Error:', error);
  }

  redirect('/')
}

export async function fetchUserId(id) {
  try {
    const response = await fetch(`${url}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.ok) {
      console.log(`Fetch successfully`);
      const result = await response.json()
      return result
    } else {
      console.error('Failed to fetch the user.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchUserByEmail(email) {
  try {
    const response = await fetch(`${url}/user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.ok) {
      console.log(`Fetch successfully`);
      const result = await response.json()
      return result
    } else {
      console.error('Failed to fetch the user.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

