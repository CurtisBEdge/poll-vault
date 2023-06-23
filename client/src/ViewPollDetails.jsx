import ViewPoll from "./ViewPoll";
import PollCommentList from "./PollCommentList";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./context";
import { Typography } from "@mui/material";
import PollCommentInput from "./PollCommentInput";

const ViewPollDetails = () => {

  const { id } = useParams();
  const { client } = useContext(AppContext);
  const [poll, setPoll] = useState(undefined)
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    client.getSinglePoll(id)
      .then(({ data }) => setPoll(data));
  }, [])


  return (
    <>
      {poll ? (
        <>
          <ViewPoll poll={poll}/>
          <PollCommentList id={id} comments={comments} setComments={setComments}/>
          <PollCommentInput id={id} setComments={setComments}/>
        </>
      ) : (
        <Typography>Loading</Typography>
      )}
    </>
  )
}

export default ViewPollDetails;