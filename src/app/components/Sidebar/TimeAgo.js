'use client'
import * as React from 'react';
import { Typography } from "@mui/material";

export default function TimeAgo({ updatedAt }) {
  const [mounted, setMounted] = React.useState(false);
  const [timeAgo, setTimeAgo] = React.useState("");
  const getTimeAgo = (timestamp) => {
    const MINUTE = 60000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const MONTH = 30 * DAY;
    const YEAR = 12 * MONTH;
    if (typeof window !== 'undefined') {
      const now = new Date();
      const diff = now.getTime() - timestamp;

      if (diff < MINUTE) return "Vừa xong";
      if (diff < HOUR) return `Cập nhật ${Math.floor(diff / MINUTE)} phút trước`;
      if (diff < DAY) return `Cập nhật ${Math.floor(diff / HOUR)} giờ trước`;
      if (diff < MONTH) {
        return `Cập nhật ${Math.floor(diff / DAY)} ngày ${Math.floor((diff % DAY) / HOUR)} giờ trước`;
      }
      if (diff < YEAR) {
        return `Cập nhật ${Math.floor(diff / MONTH)} tháng ${Math.floor((diff % MONTH) / DAY)} ngày trước`;
      }
      return `Cập nhật ${Math.floor(diff / YEAR)} năm trước`;
    };
    return null;
  }

  React.useEffect(() => {
    setMounted(true);
    if (!updatedAt) return;

    const timestamp = Number(updatedAt);
    const update = () => setTimeAgo(getTimeAgo(timestamp));

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }), [updatedAt];

  // Prevent server-client mismatch
  if (!mounted || !updatedAt) return null;

  return <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>{timeAgo}</Typography>;
}