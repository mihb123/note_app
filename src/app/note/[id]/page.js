async function NoteDetail({ params }) {
  const id = await params?.id
  console.log(id)
  return (
    <>
      {/* <Main itemSelected={data?.[id]} /> */}
      <h1>Note: {id}</h1>
    </>
  );
}

export default NoteDetail;