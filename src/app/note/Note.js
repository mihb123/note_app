import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";
import { verifySession } from "@/app/utils/session"
import { fetchShareNote } from '@/app/action/shareNote';

export default async function Note() {
  const userId = await verifySession() || process.env.userID;
  const shareNotes = await fetchShareNote(userId);
  const data = await fetchNotes(userId);
  return (
    < Sidebar initialNotes={data} userId={userId} shares={ shareNotes} />
  );
}
