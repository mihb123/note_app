import * as React from 'react';
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
import { styled } from '@mui/material/styles';
import { getContent, GetTime } from '@/app/utils/function';
import { useSelectedItem } from '@/app/hooks/useSelectedItem';

export default function NoteCard({ data, HandlePinAction, CloseAction, closeSide }) {
  const updateAt = data?.updateAt
  const router = useRouter();
  const [hide, setHide] = React.useState("none");
  const handleOpen = () => setHide("inline");
  const handleClose = () => setHide("none");
  const [timeAgo, setTimeAgo] = React.useState("Chưa cập nhật");
  const handleNoteClick = (id) => {
    // setSelectedItem(id)
    router.push(`/note/${id}`); // Thay đổi URL mà không reload
  };
  // const { setSelectedItem } = useSelectedItem()

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
        const minutes = Math.floor(diff / 60000);

        const hour = 60
        const day = 24 * hour
        const month = 30 * day
        const year = 12 * month
        if (minutes < hour) {
          setTimeAgo(minutes > 0 ? `Cập nhật ${minutes} phút trước` : "Vừa xong");
        } else if (hour < minutes && minutes <= day) {
          const hours = (minutes / hour).toFixed()
          setTimeAgo(`Cập nhật ${hours} giờ trước`)
        } else if (day < minutes && minutes <= month) {
          const days = Math.floor(minutes / day)
          const hours = ((minutes % day) / hour).toFixed()
          setTimeAgo(`Cập nhật ${days} ngày ${hours} giờ trước`)
        } else if (month < minutes && minutes <= year) {
          const months = Math.floor(minutes / month)
          const days = ((minutes % months) / day).toFixed(1) * 30
          setTimeAgo(`Cập nhật ${months} tháng ${days} ngày trước`)
        }
      }
    }, 1000)
    return () => clearInterval(interval);
  })
  // console.log("render NoteCard")
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
