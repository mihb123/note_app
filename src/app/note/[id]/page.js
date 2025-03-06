'use client'
import { useParams } from 'next/navigation';
import Main from '@/app/components/Main';
import { fetchNoteId } from '@/app/action';
import useSWR from 'swr';
import Loading from './loading';

function NoteDetail() {
  const params = useParams();
  const id = params?.id;

  const { data, error, mutate } = useSWR(`notes/${id}`, () => fetchNoteId(id))
  // 
  if (data == undefined) return <Loading />
  return (
    <>
      <Main item={data} />
    </>
  );
}

// function getNoteById(id) {
//   if (typeof window !== 'undefined') {
//     const storage = localStorage.getItem("notes") || [];
//     if (storage) {
//       const notes = JSON.parse(storage)
//       const note = notes.find((note) => note.id == id);
//       return note
//     }
//   }
//   return []
// }

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