import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "./context";


const PollCommentInput = ({ setComments, id }) => {

  const { client } = useContext(AppContext);

  const [comment, setComment] = useState({
    text: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    client.submitComment(id, comment.text, Date.now())
      .then(() => {
        return client.getComments(id)
      })
      .then(({ data }) => setComments(data))
    setComment({
      text: "",
    })
  }

  const handleChange = (e) => {
    setComment({
      ...comment,
      text: e.target.value
    })
  }

  return (
    <>
      <Box my={2}>
      <TextField
        multiline
        fullWidth
        onChange={handleChange}
        value={comment.text}
        placeholder="Keep your comments to yourself"
        label="Add comment"
      />
      </Box>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </>
  )
}

export default PollCommentInput;