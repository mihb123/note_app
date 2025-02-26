import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function NoteCard(prop) {

  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom >
            {prop.data.title}
          </Typography>
          <Typography variant="body2"
            color="text.secondary"
            sx={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>
            {prop.data.content}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", my: 1, display: "block" }}>{prop.data.updateAt}</Typography>
        </CardContent>
      </CardActionArea>
    </Card >
  );
}
