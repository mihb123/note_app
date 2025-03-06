'use client'
import Sidebar from "@/app/components/Sidebar/Sidebar";
import { fetchNotes } from "@/app/action";
import useSWR from "swr";
import { Skeleton } from "@mui/material";

export default function Note() {
  // const data = await fetchNotes();
  const { data, mutate } = useSWR('notes', fetchNotes, { revalidateOnFocus: true, })
  if (data == undefined) return <Skeleton />
  return (
    < Sidebar data={data} />
  );
}
