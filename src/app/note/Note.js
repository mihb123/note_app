import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";
import { verifySession } from "@/app/utils/session"

export default async function Note() {
  const userId = await verifySession() || process.env.userID;
  const data = await fetchNotes(userId);
  return (
    < Sidebar initialNotes={data} userId={userId} />
  );
}
