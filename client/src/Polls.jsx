import AppContext from "./context";
import { useContext, useEffect } from "react";
import ViewPoll from "./ViewPoll";
import { Typography } from "@mui/material";
import { sortBy } from 'lodash';

const Polls = () => {

  const { client, polls } = useContext(AppContext);


  useEffect(() => {
    client.getPolls()
  }, [])

  const sortedPolls = sortBy(polls, ['endTime']).reverse()
  console.log(sortedPolls)

  return (
    <>
      <div>
        <Typography>Ongoing Polls</Typography>
        {sortedPolls.map((poll) => {
          if ((new Date(poll.endTime).getTime()) >= (Date.now())) {
            return <ViewPoll key={poll._id} poll={poll}/>
          }
        })}
      </div>
      <div>
        <Typography>Complete Polls</Typography>
        {sortedPolls.map((poll) => {
          if ((new Date(poll.endTime).getTime()) <= (Date.now())) {
            return <ViewPoll key={poll._id} poll={poll}/>
          }
        })}
      </div>
    </>


  );
};

export default Polls