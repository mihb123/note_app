import Sidebar from "@/components/Sidebar/Sidebar";
import { fetchNotes } from "@/action";

export default async function Note() {
  const data = await fetchNotes();
  return (
    < Sidebar data={data} />
  );
}
