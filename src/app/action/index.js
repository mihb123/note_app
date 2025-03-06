'use server'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

const url = process.env.NEXT_PUBLIC_SERVER
const urlNote = `${url}/notes`;

export async function fetchNotes() {
  try {
    const response = await fetch(`${urlNote}?_sort=updateAt&_order=DESC`, {
      method: "GET",
      next: { tags: ['note'] }, // Gán tag 'note'
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.ok) {

      return await response.json();
    } else {
      console.error('Failed to fetch the note.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function fetchNoteId(id) {
  try {
    const response = await fetch(`${urlNote}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch the noteID.');
      return []
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error("Failed to fetch the noteID.");
  }
}

export async function createNote(data) {

  try {
    const response = await fetch(urlNote, {
      method: "POST",
      next: { tags: ['note'] }, // Gán tag 'note'
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (response.ok) {
      revalidateTag("note")
      const result = await response.json()
      console.log(`Create successfully id `, result.id);

      return result;
    } else {
      console.error('Failed to create the note.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(`${urlNote}/${id}`, {
      method: 'DELETE',
      // next: { tags: ['note'] }, // Gán tag 'note'
    });

    if (response.ok) {
      revalidateTag("note")
      console.log(`Deleted successfully id ${id}.`);
    } else {
      console.error('Failed to delete the note.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function UpdateNoteAction(formData) {
  const close = formData?.get('closed') === true

  const data = {
    id: formData?.get('id'),
    title: formData?.get('title'),
    content: formData?.get('content'),
    isPin: formData?.get('isPin'),
    updateAt: formData?.get('updateAt'),
    closed: close
  }
  try {
    const res = await fetch(`${urlNote}/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    console.log("Update successfully: ", data.title, data.id)
    revalidateTag("note")
    return await res.json()
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function QuickUpdate(data) {

  try {
    const res = await fetch(`${urlNote}/${data.id}`, {
      method: "PUT",
      next: { tags: ['note'] },
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    revalidateTag("note")
    return await res.json()
  } catch (error) {
    console.error('Error:', error);
  }
}


