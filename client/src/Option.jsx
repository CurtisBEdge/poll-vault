import { Checkbox, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { isValidInput, pollURLValidation } from "./createPollFormValidation";

const Option = ({ setOption, option, optional, setError, setDirty }) => {

  const [errors, setErrors] = useState({
    name: false,
    url: false,
  })

  const [dirty, setDirtyObject] = useState({
    name: false,
    url: false,
  })

  const validateOption = ({ name, url, }) => {
    const nameValid = isValidInput(name)
    const urlValid = pollURLValidation(url)
    setErrors({
      name: !nameValid,
      url: !urlValid,
    })
    setError(!(nameValid && urlValid))
  }

  const handleNameChange = (e) => {
    const newOption = {
      ...option,
      name: e.target.value
    }
    const newDirty = {
      ...dirty,
      name: true,
    }
    setOption(newOption)
    validateOption(newOption)
    setDirty(newDirty.name && newDirty.url)
    setDirtyObject(newDirty)
  }

  const handleUrlChange = (e) => {
    const newOption = {
      ...option,
      url: e.target.value
    }
    const newDirty = {
      ...dirty,
      url: true,
    }
    setOption(newOption);
    validateOption(newOption);
    setDirty(newDirty.name && newDirty.url)
    setDirtyObject(newDirty)
  }

  const handleCheck = (e) => {
    setOption({
      ...option,
      checked: e.target.checked
    })
    if (e.target.checked) {
      if (dirty.name || dirty.url) {
        validateOption(option)
      }
      setDirty(dirty.name && dirty.url)
    } else {
      setErrors({
        name: false,
        url: false,
      })
      setError(false)
      setDirty(true)
    }
  }

  return (
    <Grid spacing={2} alignItems="center" direction="row" container>
      <Grid flexGrow={1} item>
        <TextField
          fullWidth
          label="Option"
          variant="outlined"
          name='name'
          disabled={optional ? !option.checked : false}
          error={errors.name}
          helperText={errors.name ? "Cannot be empty" : undefined}
          value={option.name}
          onChange={handleNameChange}
          onBlur={handleNameChange}
        />
      </Grid>
      <Grid flexGrow={1} item>
        <TextField
          fullWidth
          label="URL"
          variant="outlined"
          name='url'
          disabled={optional ? !option.checked : false}
          error={errors.url}
          helperText={errors.url ? "Must be a valid URL" : undefined}
          value={option.url}
          onChange={handleUrlChange}
          onBlur={handleUrlChange}
        />
      </Grid>
      <Grid item>
        <Checkbox
          name='checkbox'
          disabled={!optional}
          checked={!optional || option.checked}
          onChange={handleCheck}
        />
      </Grid>
    </Grid>
  )
}
export default Option