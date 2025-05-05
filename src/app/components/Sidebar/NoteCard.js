'use client'
import * as React from 'react';
import dynamic from 'next/dynamic';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import DeleteConfirm from './DeleteConfirm';
import PushPinIcon from '@mui/icons-material/PushPin';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import ReplayIcon from '@mui/icons-material/Replay';
import { getContent } from '@/app/utils/function';

const DynamicTimeAgo = dynamic(
  () => import('./TimeAgo'),
  {
    ssr: false,
    loading: () => <span>Updating...</span>
  }
);

export default function NoteCard({ data, HandlePinAction, CloseAction, closeSide }) {
  const updatedAt = data?.updatedAt;
  const router = useRouter();
  const [hide, setHide] = React.useState("none");

  const handleOpen = () => setHide("inline");
  const handleClose = () => setHide("none");
  const handleNoteClick = (id) => {
    router.push(`/note/${id}`);
  };

  const { newContent, checkedTask, allTask } = getContent(data)

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);

  return (
    <>
      <Card
        sx={{ position: 'relative', width: '100%' }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        <CardActionArea>
          {/* Delete Icon */}
          <Tooltip title="Delete" arrow placement='top'>
            <DeleteIcon
              color="secondary"
              sx={{
                fontSize: 20,
                position: 'absolute',
                top: 15,
                right: 15,
                display: hide,
                cursor: 'pointer',
                "&:hover": { color: "red" },
              }}
              onClick={handleClickOpen}
            />
          </Tooltip>

          {/* Reopen/Close Icon */}
          {closeSide ? (
            <Tooltip title="Reopen note" arrow placement='top'>
              <ReplayIcon
                color="secondary"
                onClick={() => CloseAction(data)}
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 15,
                  right: 40,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": { color: "yellow" },
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Close note" arrow placement='top'>
              <CancelIcon
                color="secondary"
                onClick={() => CloseAction(data)}
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 15,
                  right: 40,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": { color: "yellow" },
                }}
              />
            </Tooltip>
          )}

          {/* Pin Icon */}
          {!closeSide && (
            <Tooltip title="Pin" arrow placement='top'>
              <PushPinIcon
                color="secondary"
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 16,
                  right: 65,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": { color: "yellow" },
                }}
                onClick={() => HandlePinAction(data)}
              />
            </Tooltip>
          )}

          {/* Card Content */}
          <CardContent onClick={() => handleNoteClick(data.id || data._id)}>
            <Typography sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
              {data.title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden", my: 1 }}>
              {newContent}
            </Typography>

            {allTask != 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                <TaskAltIcon sx={{ mr: 0.5, fontSize: 18 }} />
                <span style={{ fontSize: 12 }}>{checkedTask}/{allTask}</span>
              </Typography>
            )}

            {typeof updatedAt == 'number' && <DynamicTimeAgo updatedAt={updatedAt} />}
          </CardContent>
        </CardActionArea>
      </Card>

      <DeleteConfirm id={data.id || data._id} title={data.title} open={open} setOpen={setOpen} />
    </>
  );
}