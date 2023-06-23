import { Typography } from "@mui/material";

const PollComment = ({ comment }) => {
  return (
    <>
      <Typography>{comment.user.username}</Typography>
      <Typography>{comment.text}</Typography>
      <Typography>{comment.timestamp}</Typography>
    </>
  )
}
export default PollComment;