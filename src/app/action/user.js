import { verifySession } from "../utils/session"
import { cache } from 'react';



export const getUser = cache(async () => {
  const url = process.env.SERVER;
  const session = await verifySession()
  if (!session) return null
  const email = session.email

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
      console.error('Failed to fetch the note.');
    }
  } catch (error) {
    console.error('Error:', error);
  }

})