import Box from '@mui/material/Box';
import Main from '@/components/Main';
import Sidebar from "@/components/Sidebar";


const url = "http://localhost:5000";
const urlNote = `${url}/notes`;

async function fetchNotes() {
  const res = await fetch(urlNote);
  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }
  return res.json();
}

export default async function Home() {
  const data = await fetchNotes();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar data={data} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Main item={data[0]} />
      </Box>
    </Box>
  );
}
