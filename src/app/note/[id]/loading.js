import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function Loading() {
  return (
    < >

      <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
      <Skeleton variant="rounded" height={300} />

    </>
  );
}

export default Loading;