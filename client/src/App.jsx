import { useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography } from "@mui/material";

import AppContext from "./context";
import Home from './Home';
import Signup from "./Signup";
import NotFound from "./NotFound";
import CreatePollForm from "./CreatePollForm";
import { ADMIN_ROLE } from "./userUtils";
import ViewPoll from "./ViewPoll";
import PollCommentList from "./PollCommentList";
import PollCommentInput from "./PollCommentInput";
import ViewPollDetails from "./ViewPollDetails";

const App = () => {

  const { client, username, role } = useContext(AppContext);
  const navigate = useNavigate()
  const location = useLocation();
  const showSUButton = (location.pathname === "/signup") ? "" :
    <Button variant='outlined' onClick={() => navigate("/signup")}>Sign Up</Button>;
  const signedIn = username ? `Signed in as ${username}` : ``;

  const signMeOut = () => {
    client.signOut()
    navigate('/')
  }

  const signInOut = () => {
    if (username) {
      return (
        <Button variant="contained" onClick={signMeOut}>Sign Out</Button>
      )
    } else {
      return (
        <Button variant="contained" onClick={() => navigate('/')}>Sign In</Button>
      )
    }
  };

  return (
    <Container>
      <header>
        <Grid container alignItems="center">
          <Grid item flexGrow={1}>
            {showSUButton}
          </Grid>
          <Grid item>
            <Typography>{signedIn}</Typography>
          </Grid>
          <Grid item m={1}>
            {signInOut()}
          </Grid>
          {(role === ADMIN_ROLE && username) && (
            <Grid item m={1}>
              <Button variant="contained" onClick={() => navigate('/create-poll')}>Create New Poll</Button>
            </Grid>
          )}
          {username && (
            <Grid item m={1}>
              <Button variant="contained" onClick={() => navigate('/')}>Home</Button>
            </Grid>
          )}
        </Grid>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/create-poll" element={<CreatePollForm/>}/>
          <Route path="/polls/:id">
            <Route index element={<ViewPollDetails/>}/>
            <Route path="addcomment" element={<PollCommentInput/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </Container>
  )
}

export default App;