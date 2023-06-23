import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import AppContext from "./context";

const Login = () => {
  const [userDetails, setUserdetails] = useState({ username: "", password: "" })
  const [error, setError] = useState({ username: [], password: [] });
  const [serverError, setServerError] = useState();
  const { client } = useContext(AppContext);

  const validateField = (fieldName, value) => {
    const newFieldErrors = [];
    if (value === '') {
      newFieldErrors.push('Cannot be empty');
    }
    return newFieldErrors;
  }

  const validateForm = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setError({
      ...error,
      [fieldName]: validateField(fieldName, value)
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    client.logIn(userDetails.username, userDetails.password)
      .then(() => {
          setUserdetails({ username: "", password: "" })
        }
      )
      .catch((error) => {
        setServerError(error.response.statusText)
      })
  }

  const handleChange = (e) => {
    setUserdetails({ ...userDetails, [e.target.name]: e.target.value });
    validateForm(e)
  }

  return (
    <>
      <Box>
      {serverError && (
        <Alert severity="error">{serverError}</Alert>
      )}
    </Box>
      <Typography variant="h2">Log In</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              margin={"normal"}
              fullWidth
              label="Username"
              onChange={handleChange}
              type="text"
              name="username"
              error={error.username.length > 0}
              helperText={error.username.join(', ')}
            />
            <TextField
              margin={"normal"}
              fullWidth
              label="Password"
              onChange={handleChange}
              type="password"
              name="password"
              error={error.password.length > 0}
              helperText={error.password.join(', ')}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;