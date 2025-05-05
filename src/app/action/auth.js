'use server'
import { createSession } from '@/app/utils/session'

const url = process.env.NEXT_PUBLIC_SERVER

export async function CreateUser(data) {
  // Insert the users into the database or call an Library API
  try {
    const res = await fetch(`${url}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (res.ok) {
      const result = await res.json()
      console.log(`User ${result.email} created successfully:`, result.id)
      await createSession(result.id)
    }
  }
  catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchUserId(id) {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.error('Failed to fetch the users by id.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchUserByEmail(email) {
  try {
    const response = await fetch(`${url}/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (response.ok) {
      console.log(`Fetch user ${email} successfully`);
      const result = await response.json()
      return result
    } else {
      console.error('Failed to fetch the users by email.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

