import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";
import DeleteConfirm from '../DeleteConfirm';
import PushPinIcon from '@mui/icons-material/PushPin';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltip from '@mui/material/Tooltip';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import { getContent } from '@/app/utils/function';

export default function NoteCard({ data, HandlePinAction, CloseAction, closeSide }) {
  const updateAt = data?.updateAt
  const router = useRouter();
  const [hide, setHide] = React.useState("none");
  const handleOpen = () => setHide("inline");
  const handleClose = () => setHide("none");
  const [timeAgo, setTimeAgo] = React.useState("Chưa cập nhật");
  const handleNoteClick = (id) => {
    router.push(`/note/${id}`); // Thay đổi URL mà không reload
  };

  const { newContent, checkedTask, allTask } = getContent(data)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Cập nhật thời gian "X phút trước" mỗi giây
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (updateAt) {
        const oldTime = Number(updateAt)
        const now = new Date();
        const diff = now.getTime() - oldTime
        const diffInMinutes = Math.floor(diff / 60000);
        if (diffInMinutes < 60) {
          setTimeAgo(diffInMinutes > 0 ? `Cập nhật ${diffInMinutes} phút trước` : "Vừa xong");
        } else if (60 < diffInMinutes <= 1440) {
          const hours = Math.floor(diffInMinutes / 60)
          setTimeAgo(`Cập nhật ${hours} giờ trước`)
        } else if (1440 < diffInMinutes <= 43200) {
          const days = Math.floor(diffInMinutes / 60 / 24)
          setTimeAgo(`Cập nhật ${days} ngày trước`)
        } else if (43200 < diffInMinutes <= 518400) {
          const months = Math.floor(diffInMinutes / 60 / 24 / 30)
          setTimeAgo(`Cập nhật ${months} tháng trước`)
        }
      }
    }, 1000)
    return () => clearInterval(interval);
  })

  return (
    <>
      <Card sx={{ position: 'relative', width: '100%' }}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}>
        <CardActionArea>
          <Tooltip title="Delete" arrow placement='top' >
            <DeleteIcon color="secondary"
              sx={{
                fontSize: 20,
                position: 'absolute',
                top: 15,
                right: 15,
                display: hide,
                cursor: 'pointer',
                "&:hover": {
                  color: "red"
                },
              }}
              onClick={handleClickOpen}
            />
          </Tooltip>

          {closeSide ? <>
            <Tooltip title="Reopen note" arrow placement='top' >
              <ReplayIcon color="secondary"
                onClick={() => CloseAction(data)}
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 15,
                  right: 40,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": {
                    color: "yellow"
                  },
                }} />
            </Tooltip>
          </> :
            <Tooltip title="Close note" arrow placement='top' >
              <CancelIcon color="secondary"
                onClick={() => CloseAction(data)}
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 15,
                  right: 40,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": {
                    color: "yellow"
                  },
                }} />
            </Tooltip>
          }
          {!closeSide &&
            <Tooltip title="Pin" arrow placement='top' >
              <PushPinIcon color="secondary"
                sx={{
                  fontSize: 20,
                  position: 'absolute',
                  top: 16,
                  right: 65,
                  display: hide,
                  cursor: 'pointer',
                  "&:hover": {
                    color: "yellow"
                  },
                }}
                onClick={() => HandlePinAction(data)}
              />
            </Tooltip>
          }
          <CardContent onClick={() => handleNoteClick(data.id)}>

            {/* title */}
            <Typography sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
              {data.title}
            </Typography>

            {/* content */}
            <Typography variant="body2"
              color="text.secondary"
              sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden", my: 1 }}>
              {newContent}
            </Typography>

            {/* Task */}
            {allTask != 0 && <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TaskAltIcon sx={{ mr: 0.5, fontSize: 18 }} /> <span style={{ fontSize: 12 }}>{checkedTask}/{allTask}</span>
              </Typography>
            </>}

            {/* time ago */}
            <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>{timeAgo}</Typography>
          </CardContent>
        </CardActionArea>
      </Card >
      <DeleteConfirm
        id={data.id}
        title={data.title}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
