import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Option from "./Option";
import { isValidDate, isValidInput } from "./createPollFormValidation";
import AppContext from "./context";
import { ADMIN_ROLE } from "./userUtils";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";


const CreatePollForm = () => {
  const { client, role } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== ADMIN_ROLE) {
      navigate('/')
    }
  }, []);

  const [serverError, setServerError] = useState(undefined);

  const [title, setTitle] = useState('');
  const [optionOne, setOptionOne] = useState({ name: '', url: '', checked: true });
  const [optionTwo, setOptionTwo] = useState({ name: '', url: '', checked: true });
  const [optionThree, setOptionThree] = useState({ name: '', url: '', checked: false });
  const [optionFour, setOptionFour] = useState({ name: '', url: '', checked: false });
  const [date, setDate] = useState("");

  const checkOptionToSend = () => [optionOne, optionTwo, optionThree, optionFour]
    .filter((option) => option.checked)
    .map(({ name, url }) => ({ name, url }))

  const dataToSend = {
    title,
    endTime: new Date(date).getTime(),
    options: checkOptionToSend()
  }


  const [dirty, setDirty] = useState(
    {
      title: false,
      optionOne: false,
      optionTwo: false,
      optionThree: true,
      optionFour: true,
      date: false,
    }
  );

  const [errors, setErrors] = useState({
    title: false,
    optionOne: false,
    optionTwo: false,
    optionThree: false,
    optionFour: false,
    date: false,
  })

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setErrors({
      ...errors,
      title: !isValidInput(e.target.value)
    })
    setDirty({
      ...dirty,
      title: true,
    })
  }


  const handleDateChange = (e) => {
    const chosenDate = new Date(e.target.value)
    const timeStamp = chosenDate.getTime()
    setDate(e.target.value)
    setErrors({
      ...errors,
      date: !isValidDate(timeStamp)
    });
    setDirty({
      ...dirty,
      date: true,
    })
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    setServerError(undefined)
    client.newPoll(dataToSend)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        setServerError(error.response.statusText)
      })
  }

  const allDirty = Object.keys(dirty).every((key) => dirty[key])

  const hasErrors = Object.keys(errors).some((key) => errors[key])

  const canSubmit = !hasErrors && allDirty;

  const dateCss = css`
    padding: 15px;
  `

  return (
    <>
      <Box>
        {serverError && (
          <Alert severity="error">{serverError}</Alert>
        )}
      </Box>
      <Grid container spacing={2} direction="column" onSubmit={handleSubmit}>
        <Grid item>
          <TextField
            margin="normal"
            label="What is your question?"
            fullWidth
            variant="outlined"
            error={errors.title}
            helperText={errors.title ? "Cannot be empty" : undefined}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleChange}
          />
        </Grid>
        <Grid item>
          <Option
            option={optionOne}
            setOption={setOptionOne}
            optional={false}
            setError={(hasError) => setErrors({
              ...errors,
              "optionOne": hasError
            })}
            setDirty={(isDirty) => setDirty({
              ...dirty,
              "optionOne": isDirty,
            })}
          />
        </Grid>
        <Grid item>
          <Option
            option={optionTwo}
            setOption={setOptionTwo}
            optional={false}
            setError={(hasError) => setErrors({
              ...errors,
              "optionTwo": hasError
            })}
            setDirty={(isDirty) => setDirty({
              ...dirty,
              "optionTwo": isDirty,
            })}
          />
        </Grid>
        <Grid item>
          <Option
            option={optionThree}
            setOption={setOptionThree}
            optional={true}
            setError={(hasError) => setErrors({
              ...errors,
              "optionThree": hasError
            })}
            setDirty={(isDirty) => setDirty({
              ...dirty,
              "optionThree": isDirty,
            })}
          />
        </Grid>
        <Grid item>
          <Option
            option={optionFour}
            setOption={setOptionFour}
            optional={true}
            setError={(hasError) => setErrors({
              ...errors,
              "optionFour": hasError
            })}
            setDirty={(isDirty) => setDirty({
              ...dirty,
              "optionFour": isDirty,
            })}
          />
        </Grid>
        <Grid item>
          <input
            className={dateCss}
            type="datetime-local"
            value={date}
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!canSubmit}>Submit
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default CreatePollForm