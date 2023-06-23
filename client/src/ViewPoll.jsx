import { Button, Grid, Typography, Radio, Box } from "@mui/material";
import AppContext from "./context";
import { useContext, useState } from "react";
import { ADMIN_ROLE } from "./userUtils";
import { useNavigate } from "react-router-dom";

import CountdownTimer from "./CountownTimer";
import { css } from "@emotion/css";

const ViewPoll = ({ poll }) => {

  const navigate = useNavigate();

  const { role, client, username } = useContext(AppContext);
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const deleteAccess = () => {
    if (role === ADMIN_ROLE) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            client.deletePoll(poll._id)
          }}
        >
          Delete Poll
        </Button>
      )
    }
  }

  const radioButtonOrNumbers = (option) => {
    const voterArray = poll.options.reduce((previousValue, currentValue) => [...previousValue, ...currentValue.voters], [])
    if ((!voterArray.includes(username)) && (new Date(poll.endTime).getTime()) >= (Date.now())) {
      return (
        <Radio
          checked={selectedValue === option._id}
          onChange={handleChange}
          name="optionSelector"
          value={option._id}
        />
      )
    }
    return (<Typography>{option.voters.length}</Typography>)
  }

  const voteButton = () => {
    if (selectedValue !== "") {
      return (
        <Grid px={1} flexGrow={1} item>
          <Button
            onClick={() => {
              client.vote(poll._id, selectedValue)
            }}
            variant="contained"
          >
            😻 Confirm Vote 🤪
          </Button>
        </Grid>
      )
    }
  }

  const goToDetails = () => {
    navigate(`/polls/${poll._id}`)
  }

  const commentsCss = css`
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
  `

  return (
    <Grid direction="column" container p={1} mt={2} borderRadius={2} border="1px solid black">
      <Typography flexGrow={1}>{poll.title}</Typography>
      <Grid alignItems="center" container>
        {poll.options.map((option) => {
          return (
            <Grid p={0.5} mt={1} borderRadius={1} border="1px solid grey" container direction="column" key={option._id}>
              <Typography>{option.name}</Typography>
              <a href={option.url} target="_blank"><Typography>{option.url}</Typography></a>
              {radioButtonOrNumbers(option)}
            </Grid>
          )
        })}
        <Grid item>
          <Box py={2}>
            <Grid direction="row" alignItems="center" container>
              {voteButton()}
              <Grid item>
                {deleteAccess()}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Typography className={commentsCss} onClick={goToDetails}>Number of comments: {poll.comments.length}</Typography>
      </Box>
      <Box>
        <CountdownTimer targetDate={new Date(poll.endTime).getTime()}/>
      </Box>
    </Grid>
  );
};

export default ViewPoll