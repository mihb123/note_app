import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";
import { verifySession } from "@/app/utils/session"

export default async function Note() {
  const userId = await verifySession() || 0
  const data = await fetchNotes(userId);
  return (
    < Sidebar initialNotes={data} userId={userId} />
  );
}
