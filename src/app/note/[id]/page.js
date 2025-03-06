'use client'
import { useParams } from 'next/navigation';
import Main from '@/app/components/Main';
import { fetchNoteId } from '@/app/action';
import useSWR from 'swr';
import { useSelectedItem } from '@/app/hooks/useSelectedItem';
import Loading from './loading';

function getNoteById(id) {
  if (typeof window !== 'undefined') {
    const storage = localStorage.getItem("notes") || [];
    if (storage) {
      const notes = JSON.parse(storage)
      const note = notes.find((note) => note.id == id);
      return note
    }
  }
  return []
}

function NoteDetail() {
  // const { selectedItem, setSelectedItem } = useSelectedItem()
  // const id = selectedItem || 0

  const params = useParams(); // ✅ Lấy params đúng cách trong Client Component
  const id = params?.id;
  // let note = {}
  // if (typeof window !== 'undefined') {
  const { data, error, mutate } = useSWR(`notes/${id}`, () => fetchNoteId(id))
  // 
  if (data == undefined) return <Loading />
  // const note = getNoteById(id) || []
  return (
    <>

      <Main item={data} />
    </>
  );
}

// import Main from '@/components/Main';
// const url = "http://localhost:5000";
// const urlNote = `${url}/notes`;

// async function getNoteById(id) {
//   'use server'
//   try {
//     const res = await fetch(`${urlNote}/${id}`);
//     if (res.ok) {
//       return res.json();
//     }
//   }
//   catch (error) {
//     console.error('Error:', error);
//   }
// }

// function NoteDetail({ params }) {
//   const id = params?.id;
//   const res = getNoteById(id);

//   let data = []
//   if (res == undefined) {
//     data = []
//   } else {
//     data = res
//   }

//   return (
//     <>
//       <Main item={data} />
//     </>
//   );
// }

export default NoteDetail;