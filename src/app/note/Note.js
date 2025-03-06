import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";
import useSWR from "swr";
import { Skeleton } from "@mui/material";

export default async function Note() {
  const data = await fetchNotes();

  return (
    < Sidebar note={data} />
  );
}
