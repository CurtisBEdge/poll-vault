import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context";
import PollComment from "./PollComment";
import { Typography } from "@mui/material";

const PollCommentList = ({ comments, setComments, id }) => {


  const { client } = useContext(AppContext);


  useEffect(() => {
    client.getComments(id).then(({ data }) => setComments(data))
  }, [])

  if (!comments) {
    return (
      <Typography>Loading comments</Typography>
    )
  }

  return (
    <>
      {comments.map((comment) => {
        return <PollComment key={comment._id} comment={comment}/>
      })}
    </>
  )
}

export default PollCommentList;