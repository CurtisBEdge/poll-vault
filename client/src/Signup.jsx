import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { notValidPassword, notValidUsername, passwordsDontMatch } from "./userUtils";
import AppContext from "./context";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [userDetails, setUserdetails] = useState({ username: "", password: "", confirmpassword: "" })
  const [error, setError] = useState({ username: [], password: [], confirmpassword: [] });
  const [serverError, setServerError] = useState(undefined);
  const { client } = useContext(AppContext);
  const navigate = useNavigate()

  const validateField = (fieldName, value) => {
    const newFieldErrors = [];
    if (value === '') {
      newFieldErrors.push('Cannot be empty');
    }
    if (fieldName === 'username') {
      if (notValidUsername(value)) {
        newFieldErrors.push('Usernames must only include underscores and lowercase letters (a-z) and be at least 3 characters in length.');
      }
    }
    if (fieldName === 'password') {
      if (notValidPassword(value)) {
        newFieldErrors.push('Passwords must be at least 8 characters and contain both uppercase and lowercase characters and at least one number.');
      }
    }
    if (fieldName === 'confirmpassword') {
      if (passwordsDontMatch(userDetails.password, value)) {
        newFieldErrors.push('Passwords do not match.');
      }
    }

    return newFieldErrors;
  };

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
    client.signUp(userDetails.username, userDetails.password, userDetails.confirmpassword)
      .then(() => {
          navigate("/")
          setUserdetails({ username: "", password: "", confirmpassword: "" })
        }
      )
      .catch((error) => {
        setServerError(error.response.statusText)
      })
  }

  const handleChange = (e) => {
    setUserdetails({ ...userDetails, [e.target.name]: e.target.value });
    setServerError(undefined);
    validateForm(e)
  }

  return (
    <>
      <Box>
        {serverError && (
          <Alert severity="error">{serverError}</Alert>
        )}
      </Box>
      <Typography variant="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item p={2}>
            <TextField
              margin={"normal"}
              fullWidth
              label="Username"
              onChange={handleChange}
              type="text"
              name="username"
              error={(error.username.length > 0)}
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
            <TextField
              margin={"normal"}
              fullWidth
              label="Confirm Password"
              onChange={handleChange}
              type="password"
              name="confirmpassword"
              error={error.confirmpassword.length > 0}
              helperText={error.confirmpassword.join(', ')}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default Signup