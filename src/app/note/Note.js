import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";

export default async function Note() {
  const data = await fetchNotes();
  return (
    < Sidebar data={data} />
  );
}
