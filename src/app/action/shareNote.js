'use server'
import { revalidateTag } from 'next/cache'

const url = process.env.NEXT_PUBLIC_SERVER
const urlNote = `${url}/notes`;

export async function addUserToShareNote(data) {
  const { email } = data;
  try {
    const res = await fetch(`${urlNote}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data),      
    })
    if (res.ok) {
      const result = await res.json();
      console.log(`Successfull to share note for ${email}`)
      return result;
    } else {
      console.error('Failed to share note for', email );
    }
  } catch (error) {
    console.error("Error", error);
  }
}

export async function fetchShareUser(noteId) {
  try {
    const res = await fetch(`${urlNote}/share/user/${noteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (res.ok) {
      const result = await res.json();
      console.log('Fetch share user successfully')
      return result;
    } else {
      console.error('Fail to fetch share user')
    }
  } catch (error) {
    console.error('Error', error)
  }
}

export async function fetchShareNote(userId) {
  try {
    const res = await fetch(`${urlNote}/share/note/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (res.ok) {
      const result = await res.json();
      console.log('Fetch share user successfully')
      return result;
    } else {
      console.error('Fail to fetch share user')
    }
  } catch (error) {
    console.error('Error', error)
  }
}

export async function removeShareUser(id, noteId) {
  try {
    const res = await fetch(`${urlNote}/share/${id}/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    })
    if (res.ok) {
      const result = await res.json();
      console.log('Delete share user successfully')
      return result;
    } else {
      console.error('Fail to delete share user')
    }
  } catch (error) {
    console.error('Error', error)
  }
}